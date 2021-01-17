import { constant } from 'lodash';

export const latestVersion = 0;

// Если была версия 1, а текущая 3,
// то выполнятся миграции с ключами 2 и 3 последовательно,
// где в первый раз аргументом будет текущий persisted state,
// далее аргументом будет стейт - результат пред миграции.
// С помощью constant({}) дропаем стейт для крайней версии без миграции.
export const migrations = {
  [latestVersion]: constant({}),
};
