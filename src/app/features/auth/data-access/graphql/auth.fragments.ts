import { gql } from 'apollo-angular';

export const USER_ROLES = gql`
  fragment UserRoles on User {
    roles {
      name
    }
  }
`;

export const AUTH_PAYLOAD = gql`
  fragment AuthPayload on AuthPayload {
    accessToken
    refreshToken
  }
`;
