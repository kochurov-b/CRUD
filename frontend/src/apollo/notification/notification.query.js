import { gql } from '@apollo/react-hooks';

export const NOTIFICATION = gql`
  subscription notification {
    notification {
      message
      type
    }
  }
`;
