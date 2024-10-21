# [Authentication and Access Controls](https://keystonejs.com/docs/guides/auth-and-access-control)
1. **Overview of Keystone Authentication**
   - Session Management
   - Auth Package
   - Access Control
   - Dynamic UI Config and Field Modes

2. **Setting Up Users, Auth, and Session**
   - Creating a User List
   - Configuring Authentication with `@keystone-6/auth`
   - Configuring Sessions with Stateless Sessions

3. **Loading Session Data**
   - Session Initialisation
   - Using `sessionData` for Session Queries

4. **Implementing Access Control**
   - Defining Operation-Level Access Control
   - Filter-Level Access Control
   - Item-Level Access Control
   - Field-Level Access Control

5. **Extending Access Control to GraphQL**
   - Creating Custom Queries and Resolvers
   - Bypassing Access Control with `sudo()`
   - Access Control in Relationships and Nested Queries

6. **Hooks, Extensions, and Circumventing Access Control**
   - Leveraging `context.sudo()` for Special Operations

7. **Example Implementations**
   - Blog Posts Example (Admin and Public User Roles)
   - People Example (Field Access Control Based on User Roles)

### 1. Overview of Keystone Authentication

Keystone comes with multiple features that provide control over the Admin UI and GraphQL API access:

- **Session Management**: Keystone includes APIs for starting and ending user sessions, and loading session data for each request.
- **The Auth Package**: Keystone's `@keystone-6/auth` package is an opinionated authentication system designed to work with Keystone apps.
- **Access Control**: This framework allows you to define detailed rules that restrict access to different lists, fields, or operations based on the user’s session.
- **Dynamic UI Config and Field Modes**: You can configure the Admin UI to dynamically reflect user roles and permissions.

Keystone's session management and auth package are flexible. You can replace the default implementations or integrate a completely different authentication system if needed.

### 2. Setting Up Users, Auth, and Session

#### Creating a User List

Keystone doesn't come with a pre-defined `User` list. Instead, you create your own schema with the fields you need. At a minimum, you need two fields:
- **Identity Field**: Typically an email or username, used to look up the user during sign-in.
- **Secret Field**: A password or token used for user verification.

Example of a basic `User` list schema:

```javascript
const Person = list({
  access: allowAll,
  fields: {
    name: text(),
    email: text({ isIndexed: 'unique' }),
    password: password(),
    isAdmin: checkbox(),
  },
});
```

You can add additional fields as needed, such as permissions, roles, or relationships.

#### Configuring Authentication

Keystone’s `@keystone-6/auth` package simplifies authentication setup. Start by importing `createAuth`:

```javascript
import { createAuth } from '@keystone-6/auth';

const { withAuth } = createAuth({
  listKey: 'Person',
  identityField: 'email',
  secretField: 'password',
});
```

- `listKey`: The list that contains your users.
- `identityField`: The field used for user identification (email, username).
- `secretField`: The field used for user verification (password).

The `createAuth` function returns a `withAuth` function, which enhances the Keystone configuration to handle user authentication seamlessly.

#### Configuring Sessions

Sessions are used to track user interactions across multiple requests. Keystone offers stateless sessions that store encrypted session data in a cookie:

```javascript
const session = statelessSessions({
  secret: '-- EXAMPLE COOKIE SECRET; CHANGE ME --',
});
```

Stateless sessions behave like JWTs (JSON Web Tokens) but without the downsides of storing too much data in the token. You can implement your own session strategies, such as OAuth, if necessary.

### 3. Loading Session Data

At the start of each request, Keystone initializes session data that is available as `context.session`. This is critical for making access control decisions based on who the current user is.

You can define the data that is loaded into the session by using the `sessionData` option in the auth configuration:

```javascript
const { withAuth } = createAuth({
  // other config
  sessionData: 'isAdmin',
});
```

This instructs Keystone to query the `isAdmin` field when a session is found.

### 4. Implementing Access Control

Access control in Keystone is powerful and flexible, allowing you to enforce security at the following levels:

- **Operation-Level Access Control**: Controls whether a user can perform `query`, `create`, `update`, or `delete` operations on a list.
- **Filter-Level Access Control**: Filters which items a user can access. This is similar to adding `WHERE` clauses in SQL.
- **Item-Level Access Control**: Provides granular control over individual records, often used in update or delete operations.
- **Field-Level Access Control**: Determines which fields a user can read, create, or update.

#### Operation-Level Access Control

This level restricts which operations a user can perform. For example, only admins can update or delete blog posts:

```javascript
const isAdmin = ({ session }) => Boolean(session?.data.isAdmin);

const Post = list({
  access: {
    operation: {
      query: true, // All users can query posts
      create: isAdmin, // Only admins can create posts
      update: isAdmin, // Only admins can update posts
      delete: isAdmin, // Only admins can delete posts
    },
  },
});
```

#### Filter-Level Access Control

You can define dynamic filters based on session data. For instance, public users can only see published blog posts:

```javascript
function filterPosts ({ session }) {
  if (session?.data.isAdmin) return true; // Admins can see all posts
  return { isPublished: { equals: true } }; // Public users only see published posts
}

const Post = list({
  access: {
    filter: {
      query: filterPosts,
    }
  },
});
```

This ensures that even if users try to manipulate queries, the system will enforce these access restrictions.

#### Item-Level Access Control

This is used when you need control over individual records. For example, allowing users to update their own profile but not others:

```javascript
const isPerson = ({ session, item }) => session?.data.id === item.id;

const Person = list({
  access: {
    item: {
      update: isPerson,
    },
  },
});
```

This ensures users can only update their own data.

### 5. Extending Access Control to GraphQL

Keystone provides a way to extend the GraphQL schema to include custom queries and mutations while ensuring access control is respected.

Example: Creating a custom query to get all posts from the last week:

```javascript
const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `
    type Query {
      recentPosts: [Post!]
    }`,
  resolvers: {
    Query: {
      recentPosts: (root, args, context) => {
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return context.db.Post.findMany({
          where: { publishDate: { gt: oneWeekAgo.toUTCString() } },
          orderBy: { publishDate: 'desc' },
        });
      },
    },
  },
});
```

This query will still respect the access control rules defined on the `Post` list.

#### Bypassing Access Control with `sudo()`

In certain cases, you may need to bypass access control. Keystone provides a `context.sudo()` method that gives elevated privileges, bypassing access control:

```javascript
const emailCount = await context.sudo().db.User.count({
  where: {
    email: { equals: email, mode: 'insensitive' },
  },
});
```

This allows access to sensitive data or functionality without exposing it through the public API.

### 6. Access Control in Relationships and Nested Queries

Access control also applies to relationships and nested queries. For example, if you have a `Tags` list that is related to `Posts`, querying posts through the `Tags` list will still apply the access control rules defined on `Post`.

```javascript
query {
  tags {
    posts {
      title
    }
  }
}
```

Unauthenticated users won't be able to see unpublished posts, even when querying via related fields.

### 7. Example Implementations

#### Blog Posts Example

A simple blog with posts that have an `isPublished` status:

- Admins can see and edit all posts.
- Public users can only view published posts.

```javascript
const Post = list({
  access: {
    operation: {
      query: isAdmin, // Admins can query posts
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
    filter: {
      query: filterPosts, // Public users can only see published posts
    },
  },
  fields: {
    title: text(),
    isPublished: checkbox(),
    publishDate: timestamp(),
    author: relationship({ ref: 'Person' }),
  },
});
```

#### People Example (Field-Level Access Control)

For the `Person` list, users can see their own email address but not others, and only admins can create or delete users:

```javascript
const Person = list({
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
    item: {
      update: isPerson, // Users can update their own data
    },
    field: {
      email: ({ session, item }) => session?.data.id === item.id || session?.data.isAdmin, // Only admins and the user can see the user's email
    },
  },
  fields: {
    name: text(),
    email: text({ isIndexed: 'unique' }),
    password: password(),
    isAdmin: checkbox(),
  },
});
```

In this example, admins can query, create, update, or delete any user, while individual users can only update their own profiles. Access to the `email` field is restricted based on whether the session belongs to the current user or an admin.

### 8. Hooks, Extensions, and Circumventing Access Control

#### Leveraging `context.sudo()` for Special Operations

In some situations, like system operations or administrative tasks, you may need to bypass access control altogether. Keystone provides `context.sudo()`, which allows you to perform operations without the access control rules:

```javascript
const performAdminTask = async (context) => {
  const allUsers = await context.sudo().db.User.findMany();
  // Do something with all users
};
```

This feature can be useful for background tasks, reporting, or administrative features that require elevated privileges.

#### Schema Hooks for Custom Logic

Keystone allows you to define hooks for custom logic that runs before or after certain operations, such as creating or updating an item. You can use hooks to enforce additional business logic or perform actions related to access control.

Example of a `beforeChange` hook to restrict post creation to a specific number of posts per day:

```javascript
const Post = list({
  hooks: {
    beforeChange: async ({ context, inputData, originalItem }) => {
      const todayPosts = await context.db.Post.count({
        where: {
          publishDate: {
            gte: new Date().setHours(0, 0, 0, 0),
          },
        },
      });
      
      if (todayPosts >= 5 && !context.session?.data.isAdmin) {
        throw new Error('You cannot create more than 5 posts in one day.');
      }
    },
  },
  fields: {
    title: text(),
    publishDate: timestamp(),
    isPublished: checkbox(),
    author: relationship({ ref: 'Person' }),
  },
});
```

In this example, if a user tries to create more than 5 posts in one day, an error is thrown unless the user is an admin.

### Conclusion

Keystone's authentication and access control systems provide a highly customizable framework for building secure applications. By using the `@keystone-6/auth` package, you can quickly set up authentication, define user sessions, and configure access control at various levels:

1. **Operation-Level Access** allows you to control whether users can query, create, update, or delete records.
2. **Filter-Level Access** restricts which records users can see based on dynamic conditions.
3. **Item-Level Access** enables fine-grained control over individual records.
4. **Field-Level Access** manages what users can see and modify at the field level.
5. **Custom Queries and GraphQL Resolvers** allow you to extend the API while enforcing access control.
6. **Context `sudo()`** provides a way to bypass access control for special cases.