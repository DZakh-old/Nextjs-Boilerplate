/* eslint-disable fp/no-throw */
/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */

import { NextApiRequest, NextApiResponse } from 'next';
import isArray from 'lodash/fp/isArray';

import { sampleUserData } from '@/src/utils/sample-data';

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (!isArray(sampleUserData)) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(sampleUserData);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
