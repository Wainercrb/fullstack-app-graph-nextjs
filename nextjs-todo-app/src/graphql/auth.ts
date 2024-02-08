import { gql } from "@/__generated__/gql";

export const SIGN_IN = gql(/* GraphQL */ `
  mutation signIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`);
