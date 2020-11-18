import { gql } from '@apollo/react-hooks';

export const GET_USERS = gql`
  query users($skip: Int, $limit: Int) {
    users(skip: $skip, limit: $limit) {
      users {
        id
        name
        email
      }
      totalCount
    }
  }
`;
