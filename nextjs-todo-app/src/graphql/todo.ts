import { gql } from "@/__generated__/gql";

export const GET_TODOS = gql(/* GraphQL */ `
  query GetToDos($take: Int) {
    toDos(take: $take) {
      id
      list {
        id
        title
        description
        createdBy {
          email
        }
      }
    }
  }
`);
