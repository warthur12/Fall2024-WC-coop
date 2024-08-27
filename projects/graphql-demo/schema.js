const gql = require("graphql-tag");
const UserDatabase = require("./datasource/user");

const typeDefs = gql`
  type Query {
    test: Int
    getUsers: [User]!
    getUser(id: ID!): User
  }
  type Post {
    id: ID!
    title: String!
    postUser: String!
    thumbnail: String
  }
  type User {
    id: ID!
    username: String!
    password: String!
    description: String!
  }
`;

/**--------------------------------------------------------------------**/

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./database/blog.db",
  },
};

const userdb = new UserDatabase(knexConfig);

async function getdbUsers() {
  console.log("getting users");
  var userData = "";
  const query = userdb.knex.select("*").from("Users");
  await query.then((data) => {
    userData = data;
  });
  return userData;
}

async function getResolvers() {
    const users = await getdbUsers();
  const resolvers = {
    Query: {
      test() {
        return 1;
      },
      getUsers() {
        userArray = [];
        users.forEach((user) => {
          userArray.push({
            id: user.userID,
            username: user.username,
            password: user.password,
            description: user.description,
          });
        });
        return userArray;
      },
      getUser(_, args) {
        return {
          id: userData[args.id].userID,
          username: userData[args.id].username,
          password: userData[args.id].password,
          description: userData[args.id].description,
        };
      },
    },
  };
  return resolvers;
}

module.exports = { typeDefs, getResolvers };
