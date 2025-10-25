export interface Login {
  email: string;
  password: string;
}

export interface AuthPayload {
  user: { email: string };
  accessToken: string;
  refreshToken: string;
}
