import trimEnd from 'lodash/trimEnd';

export const API_HOST_URL = trimEnd(process.env.NEXT_PUBLIC_API_HOST_URL, '/');
