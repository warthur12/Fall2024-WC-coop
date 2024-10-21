# [Relationships](https://keystonejs.com/docs/guides/relationships)
## Overview
Relationships in Keystone are crucial for connecting different content lists, allowing for structured data management. This guide illustrates how to configure these relationships effectively, with complete examples for clarity.

## Key Considerations for Relationships

1. **Data Access:** 
   - Determine which side of the relationship you need data from, influencing whether to set up a one-sided or two-sided relationship.
   
2. **Cardinality:**
   - Assess how many connections are needed on either side of the relationship to define its cardinality.

## Example Use Case: Blog App

We’ll define two main lists for a blog application:

- **User:** Represents authors of blog posts.
- **Post:** Represents the blog entries themselves.

### Defining Relationships

Relationships are established using the `relationship` field type within the Keystone schema.

#### One-Sided Example

Here's the full configuration for the `Post` list with a one-sided relationship:

```javascript
import { config, list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
      },
    }),
    Post: list({
      fields: {
        title: text(),
        content: text(),
        authors: relationship({ ref: 'User', many: true }), // One-sided relationship
      },
    }),
  },
});
```

- **Context:** Each blog post can have multiple authors, but the `Post` list does not track which posts each author has written.
- **Usage:** This configuration allows querying for authors of a specific post, providing relevant information to readers.

#### Two-Sided Example

Here’s the full configuration for both `User` and `Post` lists with a two-sided relationship:

```javascript
import { config, list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
        posts: relationship({ ref: 'Post.authors', many: true }), // Two-sided relationship
      },
    }),
    Post: list({
      fields: {
        title: text(),
        content: text(),
        authors: relationship({ ref: 'User.posts', many: true }), // Two-sided relationship
      },
    }),
  },
});
```

- **Context:** This configuration allows both querying the authors of a post and retrieving all posts associated with a specific user.
- **Usage:** You can query for all posts written by a user, creating a comprehensive view of their contributions.

## Types of Relationships

1. **One-Sided:**
   - **Example:** A post lists its authors without linking back to their posts.

2. **Two-Sided:**
   - **Example:** Both users and posts reference each other, facilitating comprehensive queries.

## Self-Referencing Relationships

Keystone also supports self-referential relationships within the same list.

### One-Sided Following Example

Here’s the configuration for a one-sided following relationship:

```javascript
import { config, list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
        follows: relationship({ ref: 'User', many: true }), // One-sided relationship
      },
    }),
  },
});
```

- **Context:** Each user can follow multiple other users, but cannot see who follows them.
- **Usage:** Suitable for applications where users can connect without needing visibility into their followers.

### Two-Sided Following Example

Here’s the configuration for a two-sided following relationship:

```javascript
import { config, list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
        follows: relationship({ ref: 'User.followers', many: true }), // Two-sided relationship
        followers: relationship({ ref: 'User.follows', many: true }), // Two-sided relationship
      },
    }),
  },
});
```

- **Context:** This setup allows each user to follow others and also see who follows them.
- **Usage:** Facilitates complex social interactions where users can manage their connections effectively.

## Establishing Cardinality

Cardinality defines how many items can be connected on each side of a relationship.

### Cardinality Configurations

- **One to One:**
  
```javascript
import { config, list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
        post: relationship({ ref: 'Post.author', many: false }), // One-to-One relationship
      },
    }),
    Post: list({
      fields: {
        title: text(),
        content: text(),
        author: relationship({ ref: 'User.post', many: false }), // One-to-One relationship
      },
    }),
  },
});
```

- **Context:** Each user can have one post, simplifying the data model.

- **One to Many:**
  
```javascript
import { config, list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
        posts: relationship({ ref: 'Post.author', many: true }), // One-to-Many relationship
      },
    }),
    Post: list({
      fields: {
        title: text(),
        content: text(),
        author: relationship({ ref: 'User.posts', many: false }), // One-to-Many relationship
      },
    }),
  },
});
```

- **Context:** A user can write multiple posts, allowing for extensive contributions.

- **Many to Many:**
  
```javascript
import { config, list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export default config({
  lists: {
    User: list({
      fields: {
        name: text(),
        posts: relationship({ ref: 'Post.authors', many: true }), // Many-to-Many relationship
      },
    }),
    Post: list({
      fields: {
        title: text(),
        content: text(),
        authors: relationship({ ref: 'User.posts', many: true }), // Many-to-Many relationship
      },
    }),
  },
});
```

- **Context:** This setup allows for collaboration between multiple authors on a single post while enabling authors to manage multiple contributions.

## Summary

Keystone relationships can be defined as one-sided or two-sided using the `relationship` field type. Each example provided includes the full configuration tree to clarify how relationships are set up. Cardinality is managed through the `many` flag, allowing for tailored data connections based on specific project needs. This flexibility enables developers to create rich, interconnected data structures that align with various application requirements.