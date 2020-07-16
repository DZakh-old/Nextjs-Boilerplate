import trimEnd from 'lodash/trimEnd';

import { getEnvVariable } from '@/utils/get-env-variable';

export const API_HOST_URL = `${trimEnd(getEnvVariable('API_HOST_URL'), '/')}/v1`;
