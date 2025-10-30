import { HttpHeaders, provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, inject, Provider } from '@angular/core';
import { InMemoryCache } from '@apollo/client/cache';
import {
  ApolloClient,
  ApolloClientOptions,
  ApolloLink,
  FetchResult,
  Observable,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN } from '@features/auth/data-access/graphql/auth.mutations';
import { LibSafeAny } from '@libs/lib-core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { GraphQLError } from 'graphql';

export const graphqlConfig: (Provider | EnvironmentProviders)[] = [
  provideHttpClient(),
  provideApollo(() => {
    const httpLink = inject(HttpLink);
    const http = httpLink.create({ uri: '/graphql' });

    const authMiddleware = new ApolloLink((operation, forward) => {
      if (operation.operationName === 'Login') {
        return forward(operation);
      }
      operation.setContext({
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('access_token') || null}`
        ),
      });
      return forward(operation);
    });

    const errorLink = onError(({ graphQLErrors, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          if (err.extensions && err.extensions['code'] === 'UNAUTHENTICATED') {
            // ignore 401 error for a refresh request
            if (operation.operationName === 'refreshToken') return;

            const observable = new Observable<
              FetchResult<Record<string, LibSafeAny>>
            >((observer) => {
              // used an annonymous function for using an async function
              (async () => {
                try {
                  const accessToken = await refreshToken();

                  if (!accessToken) {
                    throw new GraphQLError('Empty AccessToken');
                  }

                  // Retry the failed request
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };

                  forward(operation).subscribe(subscriber);
                } catch (err) {
                  observer.error(err);
                }
              })();
            });

            return observable;
          }
        }
      }
      return forward(operation);
    });

    const options: ApolloClientOptions<LibSafeAny> = {
      link: errorLink.concat(authMiddleware.concat(http)),
      cache: new InMemoryCache(),
    };

    const client = new ApolloClient(options);

    const refreshToken = async () => {
      try {
        const refreshResolverResponse = await client.mutate<{
          refreshToken: {
            accessToken: string;
            refreshToken: string;
          };
        }>({
          mutation: REFRESH_TOKEN,
          variables: {
            refreshToken: localStorage.getItem('refresh_token') || '',
          },
        });

        const accessToken =
          refreshResolverResponse.data?.refreshToken.accessToken;

        const refreshToken =
          refreshResolverResponse.data?.refreshToken.refreshToken;

        localStorage.setItem('access_token', accessToken || '');
        localStorage.setItem('refresh_token', refreshToken || '');
        return accessToken;
      } catch (err) {
        localStorage.clear();
        throw err;
      }
    };

    return options;
  }),
];
