'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

const QueryProvider = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryProvider;
