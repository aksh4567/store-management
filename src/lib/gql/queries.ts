import { gql } from "graphql-request";

export const LOGIN_USER = gql`
  query Query($userCred: String!, $password: String!) {
    loginUser(userCred: $userCred, password: $password)
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      avatar
      email
      id
      name
      role
      username
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      category
      id
      title
      description
      imageUrl
      price
      stock
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($getProductId: String) {
    getProduct(id: $getProductId) {
      id
      title
      description
      category
      price
      stock
      imageUrl
      sales {
        quantity
        productId
        id
        createdAt
      }
    }
  }
`;
