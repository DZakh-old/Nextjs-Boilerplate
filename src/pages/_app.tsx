/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';

import { useInitialStore, StoreProvider } from '@/models';

import '@/styles/main.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const $rootStore = useInitialStore(pageProps.initialState);

  return (
    <StoreProvider store={$rootStore}>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default App;
