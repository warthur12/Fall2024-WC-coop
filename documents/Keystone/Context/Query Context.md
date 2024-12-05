# [Query](https://keystonejs.com/docs/context/overview)

1. **findOne({ where: { id }, query })**:  
   - Finds a single record based on the given `id`. The `query` argument specifies the fields to be returned.
   - Example:  
     ```javascript
     const user = await context.query.User.findOne({
       where: { id: '...' },
       query: 'id name posts { id title }',
     });
     ```

2. **findMany({ where, take, skip, orderBy, query })**:  
   - Finds multiple records based on the specified `where` conditions. Supports pagination using `take` and `skip` arguments, and sorting using `orderBy`. The `query` argument specifies which fields to return.
   - Example:  
     ```javascript
     const users = await context.query.User.findMany({
       where: { name: { startsWith: 'A' } },
       take: 10,
       skip: 20,
       orderBy: [{ name: 'asc' }],
       query: 'id name posts { id title }',
     });
     ```

3. **count({ where })**:  
   - Returns the count of records that match the specified `where` conditions.
   - Example:  
     ```javascript
     const count = await context.query.User.count({
       where: { name: { startsWith: 'A' } },
     });
     ```

4. **createOne({ data, query })**:  
   - Creates a single record with the specified `data`. The `query` argument specifies which fields to return after creation.
   - Example:  
     ```javascript
     const user = await context.query.User.createOne({
       data: {
         name: 'Alice',
         posts: { create: [{ title: 'My first post' }] },
       },
       query: 'id name posts { id title }',
     });
     ```

5. **createMany({ data, query })**:  
   - Creates multiple records with the specified `data`. The `query` argument specifies which fields to return after creation.
   - Example:  
     ```javascript
     const users = await context.query.User.createMany({
       data: [
         {
           name: 'Alice',
           posts: { create: [{ title: 'Alices first post' }] },
         },
         {
           name: 'Bob',
           posts: { create: [{ title: 'Bobs first post' }] },
         },
       ],
       query: 'id name posts { id title }',
     });
     ```

6. **updateOne({ where: { id }, data, query })**:  
   - Updates a single record identified by the `id` with the provided `data`. The `query` argument specifies which fields to return after the update.
   - Example:  
     ```javascript
     const user = await context.query.User.updateOne({
       where: { id: '...' },
       data: {
         name: 'Alice',
         posts: { create: [{ title: 'My first post' }] },
       },
       query: 'id name posts { id title }',
     });
     ```

7. **updateMany({ data, query })**:  
   - Updates multiple records based on the `data` argument, which contains an array of objects specifying `where` conditions and update `data`. The `query` argument specifies which fields to return after the update.
   - Example:  
     ```javascript
     const users = await context.query.User.updateMany({
       data: [
         {
           where: { id: '...' },
           data: {
             name: 'Alice',
             posts: { create: [{ title: 'Alices first post' }] },
           },
         },
         {
           where: { id: '...' },
           data: {
             name: 'Bob',
             posts: { create: [{ title: 'Bobs first post' }] },
           },
         },
       ],
       query: 'id name posts { id title }',
     });
     ```

8. **deleteOne({ where: { id }, query })**:  
   - Deletes a single record based on the specified `id`. The `query` argument specifies which fields to return after deletion.
   - Example:  
     ```javascript
     const user = await context.query.User.deleteOne({
       where: { id: '...' },
       query: 'id name posts { id title }',
     });
     ```

9. **deleteMany({ where, query })**:  
   - Deletes multiple records based on the `where` conditions. The `query` argument specifies which fields to return after deletion.
   - Example:  
     ```javascript
     const users = await context.query.User.deleteMany({
       where: [{ id: '...' }, { id: '...' }],
       query: 'id name posts { id title }',
     });
     ```

### Key Concepts:
- **where**: A condition used to filter records (e.g., based on `id` or other fields).
- **take**: Limits the number of records returned (pagination).
- **skip**: Skips a number of records before starting to return results (pagination).
- **orderBy**: Sorts the results based on the specified field(s).
- **data**: Represents the data to be created or updated.
- **query**: A string specifying which fields should be returned by the operation (e.g., `id`, `name`, or nested fields). Defaults to `id`.