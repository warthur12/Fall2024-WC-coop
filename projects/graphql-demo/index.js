const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { addMocksToSchema } = require("@graphql-tools/mock");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, getResolvers } = require("./schema");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { Database } = require("./datasource/dbDatasource");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('viewing server route');
})

app.listen(4060, () => {
  console.log("Express listening on 4060");
})

async function startApolloServer() {
  const resolvers = await getResolvers();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ Database }),
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
}

startApolloServer();
