import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

import {
  createUser,
  getAllUsers,
  loginUser,
  updateUserProfile,
  updateUserRole,
} from "./resolvers/user";

import { getUserFromCookies } from "@/lib/helper";
import {
  addProduct,
  createSale,
  getAllProducts,
  getProduct,
} from "./resolvers/product";

const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
    getAllUsers: [User]
    getAllProducts: [Product]
    getProduct(id: String): Product
  }
  type Sale {
    id: String
    productId: String
    quantity: Int
    createdAt: String
  }
  type Mutation {
    createSale(id: String!, quantity: Int!): Boolean
    createUser(
      name: String!
      email: String!
      username: String!
      password: String!
      role: String!
    ): User
    updateUserRole(userId: String!, role: String!): Boolean
    updateUserProfile(
      userId: String!
      name: String!
      email: String
      username: String!
      avatar: String
    ): Boolean
    addProduct(
      title: String!
      description: String!
      category: String!
      price: Float!
      stock: Int
      imageUrl: String!
    ): Product
  }
  type Product {
    id: String
    title: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales: [Sale]
  }
  type User {
    id: String
    name: String
    username: String
    email: String
    avatar: String
    role: String
  }
`;

const resolvers = {
  Query: {
    loginUser,
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    getProduct,
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    addProduct,
    createSale,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Typescript: req has the type NextRequest
// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//   context: async (req) => ({ req }),
// });

// export { handler as GET, handler as POST };
const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => ({ req }),
});

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
