/* eslint-disable react/jsx-props-no-spreading */

import Head from 'next/head';
import React from 'react';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { StoreWrapper } from '@/store';

import '@/styles/main.scss';

const App = ({ Component, pageProps }) => {
  const store = useStore();

  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <Head>
        <title>Nextjs Boilerplate</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default StoreWrapper.withRedux(App);
