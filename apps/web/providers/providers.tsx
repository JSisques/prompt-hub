'use client';

import { ApolloProvider } from '@apollo/client';
import { graphqlClient } from '@/lib/apollo-client';
import { SearchProvider } from './search';
import { SessionProvider } from 'next-auth/react';
import { I18nProvider } from './i18n-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={graphqlClient}>
        <SessionProvider>
          <I18nProvider>
            <SearchProvider>{children}</SearchProvider>
          </I18nProvider>
        </SessionProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
