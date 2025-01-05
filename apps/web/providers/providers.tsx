'use client';

import { ApolloProvider } from '@apollo/client';
import { graphqlClient } from '@/lib/apollo-client';
import { SearchProvider } from './search';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <SearchProvider>{children}</SearchProvider>
    </ApolloProvider>
  );
}
