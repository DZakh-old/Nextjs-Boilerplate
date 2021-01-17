import { createMigrate } from 'redux-persist';

import { MODULE_NAMES } from '@/utils/constants';

import { latestVersion, migrations } from './migrations';
import { usersTransform } from './transforms';

export function withPersist({ rootReducer, makeConfiguredStore }) {
  /* eslint-disable global-require */
  // we need it only on client side
  const { persistStore, persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;
  /* eslint-enable global-require */

  const persistConfig = {
    version: latestVersion,
    key: 'root',
    whitelist: [MODULE_NAMES.users],
    throttle: 300,
    storage,
    transforms: [usersTransform],
    migrate: createMigrate(migrations, { debug: true }),
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const persistedStore = makeConfiguredStore(persistedReducer);
  const persistor = persistStore(persistedStore);

  return {
    persistedStore,
    persistor,
  };
}
