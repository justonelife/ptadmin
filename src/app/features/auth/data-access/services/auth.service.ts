import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable()
export class AuthService {
  apollo = inject(Apollo);

  // login(email: string, password: string) {
  //   return this.apollo.mutate(options)
  // }
}
