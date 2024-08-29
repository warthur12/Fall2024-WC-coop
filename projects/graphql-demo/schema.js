const gql = require("graphql-tag");
const UserDatabase = require("./datasource/user");
const PostDatabase = require("./datasource/post");

const typeDefs = gql`
  type Query {
    test: Int
    getUsers: [User]!
    getUser(id: ID!): User
  }
  type Mutation {
    addPost(title: String!, content: String!, date: String!, userID: ID!): [Post]
  }
  type Post {
    postID: ID!
    title: String!
    userID: ID!
    date: String
    content: String
  }
  type User {
    id: ID!
    username: String!
    password: String!
    description: String!
    pfp: String
  }
`;

/**--------------------------------------------------------------------**/

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./database/blog.db",
  },
  useNullAsDefault: true,
};

const userdb = new UserDatabase(knexConfig);
const postdb = new PostDatabase(knexConfig);

async function getdbUsers() {
  console.log("getting users");
  var userData = "";
  const query = userdb.knex.select("*").from("Users");
  await query.then((data) => {
    userData = data;
  });
  return userData;
}

async function getdbPosts() {
  console.log("getting posts");
  var postData = "";
  const query = postdb.knex.select("*").from("Posts");
  await query.then((data) => {
    postData = data;
  });
  return postData;
}

async function getResolvers() {
  const users = await getdbUsers();
  const posts = await getdbPosts();
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
            pfp: user.pfp,
          });
        });
        return userArray;
      },
      getUser(_, args) {
        return {
          id: users[args.id].userID,
          username: users[args.id].username,
          password: users[args.id].password,
          description: users[args.id].description,
          pfp: users[args.id].pfp,
        };
      },
    },
    Mutation: {
      addPost(_, args) {
        postdb.knex.insert({title: args.title, content: args.content, date: args.date, userID: args.userID}).into('Posts');
        const userPosts = postdb.knex.select("*").from("Posts").where({userID: args.userID});
        return userPosts;
      },
    },
  };
  return resolvers;
}

/**
 * INSERT INTO Posts (title,content,date,userID)
	VALUES ('admin post','post contents','8-29-24','1');
 */

module.exports = { typeDefs, getResolvers };
