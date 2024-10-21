# [Hooks](https://keystonejs.com/docs/guides/hooks)
Keystone provides a flexible and powerful CRUD GraphQL API, enabling developers to perform basic operations on data such as creating, reading, updating, and deleting records. However, as your system grows, you'll often need to embed business logic into these core operations to handle complex requirements. This is where **hooks** come in.

In this guide, we'll explore how Keystone hooks can be used to enhance core GraphQL operations, and we'll show you practical examples. 

### What is a Hook?

A **hook** is a function that you can define as part of your schema configuration, which is executed when a certain GraphQL operation is performed. Hooks allow you to extend the default behavior of Keystone’s CRUD operations by adding business logic before or after certain events. 

#### Example: Logging a New User Creation

Here’s a simple example that logs a message to the console whenever a new user is created:

```js
import { config, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
        email: text(),
      },
      hooks: {
        afterOperation: ({ operation, item }) => {
          if (operation === 'create') {
            console.log(`New user created. Name: ${item.name}, Email: ${item.email}`);
          }
        }
      },
    }),
  },
});
```

In this example:
- The hook listens for any `create`, `update`, or `delete` mutations.
- We specifically check for the `create` operation to log a message only when a new user is added.
- The `item` argument gives us access to the newly created user’s data.

### Common Use Cases for Hooks

Hooks are not just for logging—they are crucial in implementing various business logic like data validation, input preprocessing, and triggering side effects. Below, we explore some common scenarios.

---

### Modifying Incoming Data

When creating or updating records, you might want to modify the input data before saving it to the database. Keystone's `resolveInput` hook allows you to preprocess the input provided to a mutation.

#### Example: Ensuring Title Capitalization

Let's write a hook that ensures the title of a blog post starts with an uppercase letter:

```js
import { config, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';

export default config({
  lists: {
    Post: list({
      fields: {
        title: text({ validation: { isRequired: true } }),
        content: text({ validation: { isRequired: true } }),
      },
      hooks: {
        resolveInput: ({ resolvedData }) => {
          const { title } = resolvedData;
          if (title) {
            return {
              ...resolvedData,
              title: title[0].toUpperCase() + title.slice(1), // Capitalize the first letter
            };
          }
          return resolvedData;
        }
      },
    }),
  },
});
```

**Key Points**:
- **`resolveInput`** allows you to modify the data before saving it.
- Always return the modified `resolvedData`, even if no changes are made.
- You can access both the original input (`inputData`) and the currently saved item (`item`) if you need to perform more complex logic, such as comparing old and new values.

---

### Validating Inputs

Validation ensures that the data being saved follows specific business rules. Keystone's `validateInput` hook is triggered after the input has been resolved but before it is saved to the database.

#### Example: Enforcing Non-Empty Blog Titles

Here’s an example that prevents a blog post from having an empty title:

```js
import { config, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';

export default config({
  lists: {
    Post: list({
      fields: {
        title: text({ validation: { isRequired: true } }),
        content: text({ validation: { isRequired: true } }),
      },
      hooks: {
        validateInput: ({ resolvedData, addValidationError }) => {
          const { title } = resolvedData;
          if (title === '') {
            addValidationError('The title of a blog post cannot be an empty string.');
          }
        }
      },
    }),
  },
});
```

**Key Points**:
- **`validateInput`** is called after input processing but before saving.
- The function `addValidationError` is used to indicate that validation has failed, and Keystone will return this as a GraphQL error.
- Multiple validation errors can be raised by calling `addValidationError` several times.

---

### Triggering Side Effects

Sometimes, you may want to trigger external actions when data is created, updated, or deleted. Keystone offers `beforeOperation` and `afterOperation` hooks for this purpose.

#### Example: Sending a Welcome Email After User Creation

Let's implement a hook to send a welcome email when a new user is created:

```js
import { config, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { sendWelcomeEmail } from './lib/welcomeEmail';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
        email: text(),
      },
      hooks: {
        afterOperation: ({ operation, item }) => {
          if (operation === 'create') {
            sendWelcomeEmail(item.name, item.email);
          }
        }
      },
    }),
  },
});
```

**Key Points**:
- **`beforeOperation`** runs before the data is written to the database, making it ideal for performing checks or cleanup.
- **`afterOperation`** runs after the data is written, perfect for triggering side effects like sending emails, notifications, etc.
- In `afterOperation`, you can access both the new data (`item`) and the previous data (`originalItem`).

---

### List Hooks vs. Field Hooks

So far, we've seen examples where hooks are applied at the **list level**, meaning they affect the entire item. However, Keystone also supports **field hooks**, which are applied to individual fields. These hooks provide the same arguments as list hooks but also include a `fieldKey` argument to identify the field.

#### Example: Validating Email Addresses

Suppose you want to ensure that an email address contains an "@" symbol. This can be written as a field-level hook:

```js
import { config, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
        email: text({
          validation: { isRequired: true },
          hooks: {
            validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
              const email = resolvedData[fieldKey];
              if (email && !email.includes('@')) {
                addValidationError(`The email address "${email}" must contain an '@' symbol.`);
              }
            }
          }
        }),
      },
    }),
  },
});
```

**Key Points**:
- **Field hooks** are scoped to a specific field and provide `fieldKey` to identify the field being validated.
- This makes it easier to manage field-specific logic in a clear and organized way.

---

### Summary of Hook Types:

1. **`resolveInput`**: Modify input data before it is saved to the database.
2. **`validateInput`**: Validate the data before writing it to the database.
3. **`beforeOperation`**: Execute code before the database operation.
4. **`afterOperation`**: Execute code after the database operation, useful for triggering side effects.

By combining these hooks, you can embed sophisticated business logic into your Keystone application, ensuring that data integrity and workflows are tightly controlled.

For more detailed information on available hook functions and arguments, refer to the official [Hooks API](https://keystonejs.com/docs/config/hooks) documentation in Keystone.