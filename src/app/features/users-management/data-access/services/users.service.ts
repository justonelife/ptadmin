import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { LIST_USERS } from '../graphql/users.queries';
import { User } from '../types';

@Injectable()
export class UsersService {
  apollo = inject(Apollo);

  getUsers() {
    return this.apollo
      .query<{ listUsers: User[] }>({
        query: LIST_USERS,
      })
      .pipe(
        map((res) => {
          return res.data.listUsers;
        })
      );
  }
}
