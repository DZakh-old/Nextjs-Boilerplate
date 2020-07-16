import { CallApi } from '@/utils/call-api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO_ANY = any;

export type ApiRequest<S, Q> = (responseData: S) => ReturnType<CallApi<Q>>;

export type User = {
  id: number;
  name: string;
};
