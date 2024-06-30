'use client';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ENERGY_SALES_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </main>
  );
}
