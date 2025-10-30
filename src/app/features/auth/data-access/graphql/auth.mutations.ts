import { gql } from 'apollo-angular';
import { AUTH_PAYLOAD, USER_ROLES } from './auth.fragments';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      user {
        ...UserRoles
      }
      ...AuthPayload
    }
  }
  ${AUTH_PAYLOAD}
  ${USER_ROLES}
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      ...AuthPayload
    }
  }
  ${AUTH_PAYLOAD}
`;
