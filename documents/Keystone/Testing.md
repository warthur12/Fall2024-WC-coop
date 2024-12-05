# [Testing](https://keystonejs.com/docs/guides/testing)
When building a web application, it's important to verify that the system works as expected through testing. This guide will explain how to use `@keystone-6/core/testing` and **Jest** to write and run tests for your Keystone GraphQL API. These tests ensure that behaviors like access control, hooks, virtual fields, and more, function as intended.

#### Structure of the Test

Typically, tests will verify the behavior of different parts of your Keystone setup. You can check access control, field validation, custom hooks, and other business logic by writing tests for your GraphQL queries and mutations.

##### Example of a Basic Test Setup

```javascript
import { getContext } from '@keystone-6/core/context';
import { resetDatabase } from '@keystone-6/core/testing';
import * as PrismaModule from '.prisma/client';
import baseConfig from './keystone';

const dbUrl = `file:./test-${process.env.JEST_WORKER_ID}.db`;
const prismaSchemaPath = path.join(__dirname, 'schema.prisma');
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

beforeEach(async () => {
  await resetDatabase(dbUrl, prismaSchemaPath);
});

const context = getContext(config, PrismaModule);

test('Your unit test', async () => {
  // Test implementation goes here
});
```

##### Explanation of the Test

- **Database Reset for Tests:** The database URL is set to `file:./test-${process.env.JEST_WORKER_ID}.db`, allowing each Jest worker thread to run tests on separate databases in parallel. This avoids conflicts between tests.
  
- **Context API:** You can use the **Context API** in Keystone to interact with your data. The context object allows CRUD operations on your models, such as querying, creating, updating, and deleting data.

#### CRUD Operations in Tests

The **Context API** enables you to run GraphQL queries and mutations easily within your tests. Here's an example of testing CRUD operations.

##### Creating Data and Checking Results

```javascript
const person = await context.query.Person.createOne({
  data: { name: 'Alice', email: 'alice@example.com', password: 'super-secret' },
  query: 'id name email password { isSet }',
});
expect(person.name).toEqual('Alice');
expect(person.email).toEqual('alice@example.com');
expect(person.password.isSet).toEqual(true);
```

This example creates a new `Person` and checks if the created data matches what you expect.

##### Handling Errors in Tests

If you expect an operation to fail, such as missing required fields, you can check the error response using `context.graphql.raw`.

```javascript
const { data, errors } = await context.graphql.raw({
  query: `mutation {
    createPerson(data: { email: "alice@example.com", password: "super-secret" }) {
      id name email password { isSet }
    }
  }`,
});

expect(data.createPerson).toBe(null);
expect(errors).toHaveLength(1);
expect(errors[0].message).toEqual(
  'You provided invalid data for this operation.\n  - Person.name: Name must not be empty'
);
```

In this case, the test verifies that creating a person without a `name` field correctly returns an error.

#### Testing Access Control

You can also test access control by simulating different user sessions with `context.withSession()`. For example, you may want to test that users can only update tasks assigned to them.

```javascript
// Create users and a task
const [alice, bob] = await context.query.Person.createMany({
  data: [
    { name: 'Alice', email: 'alice@example.com', password: 'super-secret' },
    { name: 'Bob', email: 'bob@example.com', password: 'super-secret' },
  ],
});

const task = await context.query.Task.createOne({
  data: {
    label: 'Experiment with Keystone',
    priority: 'high',
    isComplete: false,
    assignedTo: { connect: { id: alice.id } },
  },
});

// Bob tries to update Alice's task
const { data, errors } = await context
  .withSession({ itemId: bob.id, data: {} })
  .graphql.raw({
    query: `mutation update($id: ID!) {
      updateTask(where: { id: $id }, data: { isComplete: true }) {
        id
      }
    }`,
    variables: { id: task.id },
  });

expect(data!.updateTask).toBe(null);
expect(errors).toHaveLength(1);
expect(errors![0].message).toEqual(
  `Access denied: You cannot perform the 'update' operation on the item '{"id":"${task.id}"}'. It may not exist.`
);
```

In this test, **Bob** is unable to update a task assigned to **Alice**, verifying that the access control logic is working as expected.

### Key Testing Scenarios
Some key aspects to consider when writing tests include:

1. **Access Control:** Ensure that only the right users can perform certain operations.
2. **Hooks and Virtual Fields:** Test that hooks (such as `beforeOperation` and `afterOperation`) behave correctly.
3. **Field Validations:** Validate fields, ensuring required fields are filled, and field types match the expected format.

### Conclusion

By using Keystone's testing tools and the **Context API**, you can write comprehensive tests to validate the behavior of your application, ensuring smooth operation in production. The tests can be run in parallel with different databases for each worker, minimizing conflicts and ensuring isolation between test cases.