import { gql } from 'apollo-angular';

export const ME = gql`
  query MyQuery {
    me {
      email
    }
  }
`;
