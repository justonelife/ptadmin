import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { tap } from 'rxjs';
import { LOGIN } from '../graphql/auth.mutations';
import { AuthPayload, Login } from '../types/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo = inject(Apollo);
  readonly ACCESS_TOKEN_KEY = 'access_token';
  readonly REFRESH_TOKEN_KEY = 'refresh_token';

  login(payload: Login) {
    return this.apollo
      .mutate<{
        login: AuthPayload;
      }>({
        mutation: LOGIN,
        variables: {
          email: payload.email,
          password: payload.password,
        },
      })
      .pipe(
        tap((response) => {
          if (response.data) {
            this.saveTokens(response.data.login);
          }
        })
      );
  }

  saveTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    this.saveAccessToken(accessToken);
    this.saveRefreshToken(refreshToken);
  }

  saveAccessToken(value: string) {
    if (value) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, value);
    }
  }

  saveRefreshToken(value: string) {
    if (value) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, value);
    }
  }
}
