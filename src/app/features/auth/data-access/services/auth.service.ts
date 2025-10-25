import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { tap } from 'rxjs';
import { LOGIN } from '../graphql/auth.mutations';
import { AuthPayload, Login } from '../types/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo = inject(Apollo);

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
            localStorage.setItem(
              'ptadmin:token',
              response.data.login.accessToken
            );
          }
        })
      );
  }
}
