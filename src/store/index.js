import { promiseMiddleware } from '@adobe/redux-saga-promise';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { get } from 'lodash';

// import { MODULE_NAMES } from '@/utils/constants';
import { isDevelopment, isServer, checkIsFeatureActive, FEATURES } from '@/utils/helpers';

import { withPersist } from './persist';

const combinedReducer = combineReducers({
  // [MODULE_NAMES.users]: () => {},
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (typeof window !== 'undefined' && state && state.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }
    return nextState;
  }

  return combinedReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [promiseMiddleware, sagaMiddleware];

if (isDevelopment || checkIsFeatureActive(FEATURES.logs)) {
  middleware.push(
    // eslint-disable-next-line global-require
    require('redux-logger').createLogger({
      predicate: (getState, action) => {
        return !get(action, 'meta.isSilent');
      },
      collapsed: true,
      duration: true,
      diff: true,
    })
  );
}

const makeConfiguredStore = (reducer) => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredActionPaths: ['meta.promise'],
        },
      }).concat(middleware);
    },
  });
};

export const makeStore = () => {
  let store;

  if (isServer) {
    store = makeConfiguredStore(rootReducer);
  } else {
    const { persistedStore, persistor } = withPersist({ rootReducer, makeConfiguredStore });

    store = persistedStore;
    store.__persistor = persistor; // Nasty hack
  }

  // sagaMiddleware.run(rootSaga);

  if (!isServer) {
    global.window.APP_SDK = {
      ...get(global.window, 'APP_SDK', {}),
      ...(isDevelopment ? { store } : {}),
    };
  }

  return store;
};

export const StoreWrapper = createWrapper(makeStore);
