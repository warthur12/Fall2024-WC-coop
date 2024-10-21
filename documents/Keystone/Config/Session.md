# [Session](https://keystonejs.com/docs/config/session)
Here is a list of the options and their definitions from the Keystone session management configuration:

1. **secret (required)**:  
   - A string used by `@hapi/iron` to encrypt the session cookie data. It must be at least 32 characters long.

2. **ironOptions**:  
   - Additional options passed to `Iron.seal()` and `Iron.unseal()` when encrypting and decrypting the session cookies. These options are from the `@hapi/iron` package.

3. **maxAge (default: 60 * 60 * 8 or 8 hours)**:  
   - The number of seconds until the session cookie expires.

4. **secure (default: `process.env.NODE_ENV === 'production`)**:  
   - Determines whether the cookie is only sent over HTTPS. When `true`, the cookie is only sent if the request is made over HTTPS, except when on `localhost`. It provides extra protection against man-in-the-middle attacks but doesn't fully protect the cookie if the client has access to the hard disk or if JavaScript can access it (unless the `HttpOnly` flag is also set).

5. **path (default: '/')**:  
   - Specifies the URL path that must exist in the requested URL for the cookie to be sent. The default (`/`) allows the cookie to be sent with all requests. Subdirectories can also be included.

6. **domain (default: current document URL)**:  
   - The host to which the cookie is sent. Subdomains are included if a domain is specified. Only one domain is allowed.

7. **sameSite (default: 'lax')**:  
   - Controls whether the cookie is sent with cross-origin requests. Possible values:
     - `'strict'`: The cookie is sent only with same-site requests.
     - `'lax'`: The cookie is sent with top-level same-site requests.
     - `'none'`: The cookie is sent with cross-site requests, but `secure` must also be set.
     - `true`/`false`: Boolean settings that mirror the behavior of `'strict'` and `'none'`.

### Stateless vs Stored Sessions:
- **Stateless sessions**: Session data is stored entirely in the cookie, encrypted using `@hapi/iron`.
- **Stored sessions**: A session ID is stored in the cookie, and session data is stored on the server, retrievable by the session ID.

### Session Store (for stored sessions):
- **store**: A session store object or a function that returns a session store object, used to save and load session data on the server. A session store must implement the following interface:
   - `set(sessionId, data)`: Saves session data using a session ID.
   - `get(sessionId)`: Retrieves session data using a session ID.
   - `delete(sessionId)`: Deletes session data associated with a session ID.

### Session context properties:
- **session**: Represents the session data, determined by the value returned from `sessionStrategy.start()`.
- **sessionStrategy**: An object that includes functions for managing sessions:
   - `get({ context })`: Returns the session object based on the context.
   - `start({ context, data })`: Starts a session with the provided data.
   - `end({ context })`: Ends a session.

These session management tools are used to handle authentication sessions, with `start` and `end` functions being key for handling authenticated sessions.