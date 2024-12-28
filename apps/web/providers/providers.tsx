'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';
import { SearchProvider } from './search';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <SearchProvider>{children}</SearchProvider>
    </ApolloProvider>
  );
}
