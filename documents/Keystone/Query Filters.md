# [Query Filters](https://keystonejs.com/docs/guides/filters)
## Introduction
Keystone offers a robust GraphQL API for querying your application's data, allowing for nuanced data retrieval through the use of filters. This guide will demonstrate how to effectively use filters to obtain the specific data you need, using examples based on a Task Manager schema.

## Scalar Filters

Scalar filters are used to query fields that contain primitive data types, such as strings, numbers, and timestamps. This allows for targeted queries to retrieve only the relevant data.

### Basic Query Example

To retrieve all tasks, you can simply run the following query:

```graphql
{
  tasks {
    id
    label
  }
}
```

### Filtering by Specific Conditions

If you're interested in finding tasks with a specific label, you can use the `where` argument:

```graphql
{
  tasks(where: { label: { equals: "Hello" } }) {
    id
    label
  }
}
```

- **Explanation:** This query returns tasks where the label matches "Hello".

### Negation Filters

To find tasks that do not have the label "Hello":

```graphql
{
  tasks(where: { label: { not: { equals: "Hello" } } }) {
    id
    label
  }
}
```

### Substring Search

You can also search for tasks containing specific substrings within their labels:

```graphql
{
  tasks(where: { label: { contains: "He" } }) {
    id
    label
  }
}
```

- **Explanation:** This query returns tasks with labels that include "He".

### Date Filtering

If you want to filter tasks based on their due dates, you can query for tasks with a due date after a certain point:

```graphql
{
  tasks(where: { finishBy: { gt: "2022-01-01T00:00:00.000Z" } }) {
    id
    label
  }
}
```

- **Explanation:** This retrieves tasks with a `finishBy` date greater than January 1, 2022.

### Combining Filters

You can combine multiple filters to narrow down results. For example, to find tasks with a label containing "He" and a due date after January 1, 2022:

```graphql
{
  tasks(where: {
    label: { contains: "He" },
    finishBy: { gt: "2022-01-01T00:00:00.000Z" }
  }) {
    id
    label
  }
}
```

- **Explanation:** Only tasks that meet both conditions will be returned.

## Combined Filters

For more complex queries, Keystone allows you to explicitly combine filters using logical operators.

### AND Operator

The `AND` operator is used to specify multiple conditions that must all be true:

```graphql
{
  tasks(where: { AND: [
    { label: { contains: "H" } },
    { label: { contains: "ll" } }
  ] }) {
    id
    label
  }
}
```

- **Explanation:** This query returns tasks with labels containing both "H" and "ll".

### OR Operator

The `OR` operator allows you to specify conditions where at least one must be true:

```graphql
{
  tasks(where: { OR: [
    { label: { contains: "H" } },
    { label: { contains: "ll" } }
  ] }) {
    id
    label
  }
}
```

- **Explanation:** This retrieves tasks that contain either "H" or "ll" in their labels.

### NOT Operator

The `NOT` operator filters out items that match the specified condition:

```graphql
{
  tasks(where: { NOT: {
    label: { contains: "H" }
  } }) {
    id
    label
  }
}
```

- **Explanation:** This query returns tasks that do not contain "H" in their labels.

## Relationship Filters

In addition to filtering scalar fields, you can also filter based on relationship fields. The filtering options available depend on whether the relationship is one-to-one (`many: false`) or one-to-many (`many: true`).

### To-One Relationship

For a one-to-one relationship, such as a task assigned to a user, you can filter tasks based on the user's name:

```graphql
{
  tasks(where: { assignedTo: { name: { equals: "Alice" } } }) {
    id
    label
  }
}
```

- **Explanation:** This retrieves tasks assigned to a user named "Alice".

### Filtering for Unassigned Tasks

To find tasks with no assigned user:

```graphql
{
  tasks(where: { assignedTo: null }) {
    id
    label
  }
}
```

### Inverting Conditions

You can use the `NOT` operator to find tasks where a user is assigned:

```graphql
{
  tasks(where: { NOT: { assignedTo: null } }) {
    id
    label
  }
}
```

- **Explanation:** This returns tasks that have an assigned user.

### To-Many Relationship

For relationships where multiple items can exist, such as tasks assigned to people, you can filter based on related items.

#### Some Filter

To find people who have one or more tasks containing "shopping":

```graphql
{
  people(where: { tasks: { some: { label: { contains: "shopping" } } } }) {
    id
    name
  }
}
```

#### None Filter

To find people with no tasks that are incomplete and high-priority:

```graphql
{
	people(where: { 
		tasks: { 
			none: { 
				priority: { 
					equals: "high" 
				}, 
				isComplete: { 
					equals: false 
				} 
			} 
		} 
	}) {
		id
	    name
	}
}
```

#### Every Filter

To find people who have completed all their assigned tasks:

```graphql
{
	people(where: { 
		tasks: { 
			every: { 
				isComplete: { 
					equals: true 
				} 
			} 
		} 
	}) {
		id
		name
	}
}
```

- **Explanation:** This includes people with no tasks as well.

### Combining Filters in Relationships

You can also combine filters on relationships with filters on the primary items. For example, to find people who have no high-priority, incomplete tasks but want to see their incomplete tasks:

```graphql
{
  people(where: {
    tasks: {
      none: {
        priority: { equals: "high" },
        isComplete: { equals: false }
      }
    }
  }) {
    id
    name
    tasks(where: {
      isComplete: { equals: false }
    }) {
      id
      label
    }
  }
}
```

- **Explanation:** This retrieves people without high-priority incomplete tasks, while also listing their incomplete tasks.

## Conclusion

Keystone’s GraphQL API provides extensive filtering capabilities, allowing you to tailor your data queries to meet specific conditions. By leveraging scalar filters, relationship filters, and logical operators, you can efficiently access the data necessary for your application. Exploring these capabilities using tools like GraphQL Playground can help you understand and utilize your API more effectively.