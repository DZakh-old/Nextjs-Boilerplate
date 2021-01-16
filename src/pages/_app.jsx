/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import Head from 'next/head';

import '@/styles/main.scss';

const App = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
};

export default App;
