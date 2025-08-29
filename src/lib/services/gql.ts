import { GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient(
  (process.env.NEXT_PUBLIC_BASE_URL as string) + "/api/graphql"
);

export default gqlClient;
