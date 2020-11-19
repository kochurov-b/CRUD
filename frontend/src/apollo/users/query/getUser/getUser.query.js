import { gql } from '@apollo/react-hooks';

export const GET_USER_BY_ID = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;
