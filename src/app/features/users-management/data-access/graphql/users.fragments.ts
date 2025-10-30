import { gql } from 'apollo-angular';

export const USER_DATA = gql`
  fragment UserData on User {
    id
    email
    createdAt
  }
`;
