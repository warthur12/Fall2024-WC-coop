# [Hooks Config](https://keystonejs.com/docs/config/hooks)
### Hooks API Options

1. **resolveInput**
   - **Purpose**: Transforms the input data before any other hooks are executed. It’s the last stage in the data resolving process, invoked after access control.
   - **Arguments**:
     - **`listKey`**: Key of the list being operated on.
     - **`fieldKey`**: Key of the field being operated on (only for field hooks).
     - **`operation`**: Type of operation being performed ('create' or 'update').
     - **`inputData`**: Data passed into the mutation.
     - **`item`**: Current item from the database (undefined for create).
     - **`resolvedData`**: Resolved data object after defaults and field resolvers.
     - **`context`**: The KeystoneContext object of the originating GraphQL operation.
   - **Return Value**: For fields, returns the updated field value; for lists, returns a resolved data object.

2. **validate**
   - **Purpose**: Validates resolved data before completing create or update operations, and checks conditions during delete operations.
   - **Arguments**:
     - **`listKey`**: Key of the list being operated on.
     - **`fieldKey`**: Key of the field being operated on (only for field hooks).
     - **`operation`**: Type of operation ('create', 'update', or 'delete').
     - **`inputData`**: Data passed into the mutation (undefined for delete).
     - **`item`**: Current item from the database (undefined for create).
     - **`resolvedData`**: Resolved data object (undefined for delete).
     - **`context`**: The KeystoneContext object of the originating GraphQL operation.
     - **`addValidationError(msg)`**: Function to report validation errors.
   - **Return Value**: No direct return; reports errors using `addValidationError`.

3. **beforeOperation**
   - **Purpose**: Executes side effects just before saving data to the database (for create/update) or before deletion.
   - **Arguments**:
     - **`listKey`**: Key of the list being operated on.
     - **`fieldKey`**: Key of the field being operated on (only for field hooks).
     - **`operation`**: Type of operation ('create', 'update', or 'delete').
     - **`inputData`**: Data passed into the mutation (undefined for delete).
     - **`item`**: Current item from the database (undefined for create).
     - **`resolvedData`**: Resolved data object (undefined for delete).
     - **`context`**: The KeystoneContext object of the originating GraphQL operation.
   - **Return Value**: No direct return; used for side effects.

4. **afterOperation**
   - **Purpose**: Executes side effects after data has been saved or deleted from the database.
   - **Arguments**:
     - **`listKey`**: Key of the list being operated on.
     - **`fieldKey`**: Key of the field being operated on (only for field hooks).
     - **`operation`**: Type of operation ('create', 'update', or 'delete').
     - **`inputData`**: Data passed into the mutation (undefined for delete).
     - **`originalItem`**: Original item value being updated or deleted (undefined for create).
     - **`item`**: New item value being created or updated (undefined for delete).
     - **`resolvedData`**: Resolved data object (undefined for delete).
     - **`context`**: The KeystoneContext object of the originating GraphQL operation.
   - **Return Value**: No direct return; used for side effects.

### Resolved Data Stages
During create and update operations, the value goes through several stages:

1. **Initialization**: Sets the initial value from the GraphQL input.
2. **Defaults**: Assigns default values for fields that are undefined.
3. **Relationships**: Resolves relationship fields, ensuring proper database formats.
4. **Field Values**: Converts input values to appropriate types for the database.
5. **Field Hooks**: Executes user-defined `resolveInput` hooks for fields.
6. **List Hooks**: Executes user-defined `resolveInput` hooks for lists.
