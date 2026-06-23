import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { getToken, clearSession } from '../auth/token.js';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
});

// Attach the stored JWT as a Bearer token on every request. Public operations
// simply send no token; guarded ones get authenticated automatically.
const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

// If the server rejects a request as UNAUTHENTICATED *while we hold a token*,
// that token is missing/expired/invalid — drop it and bounce to the login
// screen. The `getToken()` guard means a failed login (which also returns
// UNAUTHENTICATED, but with no token present) won't trigger a redirect.
const errorLink = onError(({ graphQLErrors }) => {
  const unauthenticated = graphQLErrors?.some(
    (e) => e.extensions?.code === 'UNAUTHENTICATED'
  );
  if (unauthenticated && getToken()) {
    clearSession();
    if (!window.location.pathname.startsWith('/admin/login')) {
      window.location.assign('/admin/login');
    }
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});