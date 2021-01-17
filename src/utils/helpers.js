import { trimEnd } from 'lodash';

export const isServer = typeof window === 'undefined';
export const isDev = process.env.NODE_ENV !== 'production';

export const API_HOST_URL = trimEnd(isDev ? '/' : process.env.NEXT_PUBLIC_API_HOST_URL, '/');
