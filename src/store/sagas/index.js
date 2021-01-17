import { all, call, spawn } from 'redux-saga/effects';

import { map } from 'lodash';

export function* rootSaga() {
  const watcherSagas = [];

  // Защищаем rootSaga от случайно не захэнденной ошибки.
  // https://redux-saga.js.org/docs/advanced/RootSaga.html
  yield all(
    map(watcherSagas, (watcherSaga) => {
      return spawn(function* detachedWatcherSaga() {
        // eslint-disable-next-line no-loops/no-loops
        while (true) {
          try {
            yield call(watcherSaga);
            break;
          } catch (error) {
            console.error(error);
          }
        }
      });
    })
  );
}
