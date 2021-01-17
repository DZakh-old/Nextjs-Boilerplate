import { createNextState } from '@reduxjs/toolkit';
import { createMigrate, createTransform } from 'redux-persist';

import { forEach, constant } from 'lodash';

import { MODULE_NAMES } from '@/utils/constants';

const latestVersion = 0;

// Если была версия 1, а текущая 3,
// то выполнятся миграции с ключами 2 и 3 последовательно,
// где в первый раз аргументом будет текущий persisted state,
// далее аргументом будет стейт - результат пред миграции.
// С помощью constant({}) дропаем стейт для крайней версии без миграции.
const migrations = {
  [latestVersion]: constant({}),
};

const usersTransform = createTransform(
  (inboundState) => {
    return createNextState(inboundState, (inboundDraft) => {
      forEach(inboundDraft.entities, (userDraft) => {
        userDraft.isActive = false;
      });
    });
  },
  null,
  { whitelist: [MODULE_NAMES.users] }
);

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
