'use client';

import { ApolloProvider } from '@apollo/client';
import { graphqlClient } from '@/lib/apollo-client';
import { SearchProvider } from './search';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <SessionProvider>
        <SearchProvider>{children}</SearchProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
