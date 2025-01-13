'use client';

import { ApolloProvider } from '@apollo/client';
import { graphqlClient } from '@/lib/apollo-client';
import { SearchProvider } from './search';
import { SessionProvider } from 'next-auth/react';
import { I18nProvider } from './i18n-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <SessionProvider>
        <I18nProvider>
          <SearchProvider>{children}</SearchProvider>
        </I18nProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
