import { createNextState } from '@reduxjs/toolkit';
import { createTransform } from 'redux-persist';

import { forEach } from 'lodash';

import { MODULE_NAMES } from '@/utils/constants';

export const usersTransform = createTransform(
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
