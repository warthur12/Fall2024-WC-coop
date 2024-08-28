A detailed list of projects worked on with the following information information will be stored here.
- Name
- Start Date
- End Data
- Tools Used
- Description
- Learning Objectives Acomplished
- Notes

## GraphQL-Demo
8/26/2024 | 8/27/2024

**Backend**
* Express
* ApolloServer
* GraphQL
* Sqlite3

**Frontend**
* TypeScript
* React
* Next.js
* Tailwind
* Ant Design

### Description
A simple demo application meant to allow for a safe space to test and understand various important web development tools. The primary focus of this project is to create a proof of concept with the following deliverables.
* A client that displays multiple pages with basic navigation.
* A database which hosts sample data on users.
* A backend which takes and interprets database information and acts as an entrypoint for the client to retrieve and parse the data.
### Learning Objectives
1. Learn how to query a GraphQL server.
2. Using Node.js (with express), learn how to build a server using GraphQL to process data from a local Sqlite database.
3. Learn how to build an Sqlite database.
4. Learn how to set up a basic client server using Next.js.
5. Style pages using Tailwind css.
6. Style and use components from Ant Design.
7. Learn how to retrieve data from the locally hosted GraphQL server and parse and display the data.

### Notes
***Further Development***
The project is very basic and does not specifically represent anything that would exist in the real world. The project could be cleaned up and the UI could be made more presentable.

Express is used very little in the project, the GraphQL database interpolation could be run through express to create a more easily accessible api environment.

Along with a more accessible api environment additional features could be added which would require additional learning, such as: GraphQL mutations in order to allow users to create accounts, investigate ways to authenticate user information for security, expand the database and GraphQL resolvers in order to allow for more specific queries.

This project could be containerized. The client and server run through different ports and it *should* not be too difficult to create a Dockerfile for both and then run them in containers. Given the nature of the development of this project there is a very high chance that when containerized it could be found that much of the function of the app relied on system variables which would not be available in the container.