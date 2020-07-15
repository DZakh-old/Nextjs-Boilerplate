/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import React, { useMemo } from 'react';
import { applySnapshot, addMiddleware, Instance, types, flow } from 'mobx-state-tree';
import { useStaticRendering } from 'mobx-react-lite';
import { actionLogger } from 'mst-middlewares';

import map from 'lodash/map';

import { isServer } from '@/utils/helpers';

import { $currentUser } from './current-user';

if (isServer) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useStaticRendering(true);
}

type InnerStoreNames = '$currentUser';

const $rootStore = types
  .model({
    $currentUser,
    state: types.maybe(types.enumeration('State', ['pending', 'done', 'error'])),
  })
  .actions((self) => {
    const update = flow(function* updateSubStores(storeNames: InnerStoreNames[]) {
      self.state = 'pending';

      try {
        yield Promise.all(map(storeNames, (storeName) => self[storeName].update()));
        self.state = 'done';
      } catch (error) {
        console.error('Failed to update root store', error);
        self.state = 'error';
      }
    });

    return { update };
  });

export type RootStore = Instance<typeof $rootStore>;

let store: RootStore | undefined;

export function initializeStore(snapshot = null): RootStore {
  const _store =
    store ??
    $rootStore.create({
      $currentUser: { $partnerAccount: null, $user: null },
    });

  // Add middleware on the first store creation
  if (!store) {
    addMiddleware(_store, actionLogger);
  }
  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.tsx` and `pages/ssr.tsx` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  // For SSG and SSR always create a new store
  if (isServer) {
    return _store;
  }
  // Create the store once in the client
  if (!store) {
    store = _store;
  }

  return store;
}

export function useInitialStore(initialState: any): RootStore {
  return useMemo(() => initializeStore(initialState), [initialState]);
}

const storeContext = React.createContext<RootStore | null>(null);

export const StoreProvider: React.FC<{ store: RootStore }> = ({
  children,
  store: currentRootStore,
}) => {
  return <storeContext.Provider value={currentRootStore}>{children}</storeContext.Provider>;
};

export function useRootStore(): RootStore {
  const currentRootStore = React.useContext(storeContext);

  if (!currentRootStore) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return currentRootStore;
}
