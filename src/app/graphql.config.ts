import { provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, inject, Provider } from '@angular/core';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

export const graphqlConfig: (Provider | EnvironmentProviders)[] = [
  provideHttpClient(),
  provideApollo(() => {
    const httpLink = inject(HttpLink);

    const auth = setContext((operation, { headers }) => {
      if (operation.operationName === 'Login') {
        return headers;
      }

      const token = localStorage.getItem('ptadmin:token');

      if (!token) {
        return headers;
      }

      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    });

    return {
      link: ApolloLink.from([auth, httpLink.create({ uri: '/graphql' })]),
      cache: new InMemoryCache(),
    };
  }),
];
