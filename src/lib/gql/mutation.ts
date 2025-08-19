import { gql } from "graphql-request";

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
    $role: String!
  ) {
    createUser(
      name: $name
      email: $email
      username: $username
      password: $password
      role: $role
    ) {
      id
      username
      name
      role
      email
      avatar
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $imageUrl: String!
    $stock: Int
  ) {
    addProduct(
      title: $title
      description: $description
      category: $category
      price: $price
      imageUrl: $imageUrl
      stock: $stock
    ) {
      description
      id
      imageUrl
      price
      stock
      title
      category
    }
  }
`;
export const CREATE_SALE = gql`
  mutation CreateSale($id: String!, $quantity: Int!) {
    createSale(id: $id, quantity: $quantity)
  }
`;
