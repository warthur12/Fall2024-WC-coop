# [Context Config](https://keystonejs.com/docs/context/overview)
### Context API Options

1. **Query API**
   - **`query`**: The Query API for performing CRUD operations against your GraphQL API, enabling you to retrieve queried values.

2. **Database API**
   - **`db`**: The Database API for executing CRUD operations, returning database objects that can be used in mutations and schema extensions.

3. **HTTP Request Object**
   - **`req`**: The incoming HTTP request object (IncomingMessage).
   - **`res`**: The server response object for the HTTP request (ServerResponse).

4. **Session API**
   - **`session`**: The current session data object that holds user session information.
   - **`sessionStrategy`**: An object containing functions (`get`, `start`, and `end`) to manipulate sessions.

5. **GraphQL Helpers**
   - **`graphql.schema`**: The GraphQL Schema object that can be used directly or via other GraphQL helpers.
   - **`graphql.raw`**: An async function to execute a GraphQL query, returning both data and errors. Accepts a query (string or GraphQL Document) and optional variables.
   - **`graphql.run`**: An async function to execute a GraphQL query and return only the data. It throws exceptions for any errors encountered during execution.

6. **New Context Creators**
   - **`sudo()`**: Creates a new Context object that bypasses access control limitations.
   - **`withRequest(req, res)`**: Creates a new Context object with the session determined by the session strategy's `get` function.
   - **`withSession(newSession)`**: Creates a new Context object with the session replaced by the provided `newSession`.

7. **Raw Prisma Access**
   - **`prisma`**: Direct access to the underlying database driver via the Prisma Client object for raw database operations.

8. **Images API**
   - **`images.getUrl(mode, id, extension)`**: Returns the URL for accessing an image over HTTP, given its mode, ID, and extension.
   - **`images.getDataFromRef(ref)`**: Returns an `ImageData` object given a reference string (ID) of an existing image.
   - **`images.getDataFromStream(stream)`**: Returns an `ImageData` object from a readable data stream, inferring details from the stream and storing it in the filesystem.

### Image Data Type
- **`ImageData`**: An object containing metadata about an image, including:
  - **`mode`**: The image mode (e.g., 'local').
  - **`id`**: The unique identifier for the image.
  - **`extension`**: The file extension (e.g., 'jpg', 'png').
  - **`filesize`**: The size of the image file in bytes.
  - **`width`**: The width of the image in pixels.
  - **`height`**: The height of the image in pixels.
