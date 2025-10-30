import { gql } from 'apollo-angular';
import { USER_DATA } from './users.fragments';

export const LIST_USERS = gql`
  query ListUsers {
    listUsers {
      ...UserData
    }
  }
  ${USER_DATA}
`;
