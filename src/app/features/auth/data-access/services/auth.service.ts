import { inject, Injectable } from '@angular/core';
import { RedirectCommand, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { catchError, map, of, tap } from 'rxjs';
import { LOGIN } from '../graphql/auth.mutations';
import { ME } from '../graphql/auth.queries';
import { AuthPayload, Login } from '../types/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo = inject(Apollo);
  router = inject(Router);
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

  isAuthenticated() {
    return this.apollo
      .query<{ me: { email: string } }>({
        query: ME,
      })
      .pipe(
        map(() => true),
        catchError(() => {
          return of(
            new RedirectCommand(this.router.parseUrl('/auth/login'), {})
          );
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
