import { GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient(
  "https://store-management-inky.vercel.app/api/graphql"
);

export default gqlClient;
