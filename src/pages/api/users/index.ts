import isArray from 'lodash/fp/isArray';
import { NextApiRequest, NextApiResponse } from 'next';

import { sampleUserData } from '@/utils/sample-data';

export const usersHandler = (_req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (!isArray(sampleUserData)) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(sampleUserData);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
