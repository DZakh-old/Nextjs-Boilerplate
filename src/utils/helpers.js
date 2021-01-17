import { get, trimEnd, values } from 'lodash';

import { makeFeatureControl } from '@/utils/feature-control';

export const isServer = typeof window === 'undefined';
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const API_HOST_URL = isProduction ? trimEnd(process.env.NEXT_PUBLIC_API_HOST_URL, '/') : '';

export const FEATURES = {
  logs: 'logs',
};

const { checkIsFeatureActive, toggleFeatureState, updateActiveFeatures } = makeFeatureControl({
  lsKey: 'app-feature-control',
  features: values(FEATURES),
});

if (!isServer) {
  /* global window */
  updateActiveFeatures();
  window.APP_SDK = {
    ...get(window, 'APP_SDK', {}),
    toggleFeatureState,
  };
}

export { checkIsFeatureActive };
