'use client';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DeviceConfigurationProvider from '@/providers/device-configuration.providers';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ENERGY_SALES_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <ApolloProvider client={client}>
        <DeviceConfigurationProvider>
          <Component {...pageProps} />
        </DeviceConfigurationProvider>
      </ApolloProvider>
    </main>
  );
}
