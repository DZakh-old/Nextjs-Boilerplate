/* eslint-disable camelcase */

import { PartnerStatuses } from './constants';

/**
 * Типы с подписью Contract - формат,
 * что приходит с бэка, который нужно мапить.
 */

export type PartnerStatusesContract = 0 | 1 | 2 | 3;

export type CurrentUserData = {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  partnerAccount: {
    id: string;
    name: string;
    companyName: string;
    status: PartnerStatuses;
    pid: number;
  } | null;
};
export type CurrentUserDataContract = {
  authorized: boolean;
  user:
    | {
        id: string;
        email: string;
        name: string;
      }
    | [];
  partner_account: {
    id: string;
    name: string;
    companyName: string;
    status: PartnerStatusesContract;
    pid: number;
  } | null;
};

export type CreatePartnerCredentials = {
  name: string;
  phone: string;
  companyName: string;
};
export type CreatePartnerCredentialsContract = {
  name: string;
  phone: string;
  company_name: string;
};

export type RegisterCredentials = {
  email: string;
  name: string;
  lastName: string;
  accountName: string;
  phone: string;
  password: string;
};
export type RegisterCredentialsContract = {
  email: string;
  name: string;
  last_name: string;
  account_name: string;
  phone: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};
export type LoginCredentialsContract = LoginCredentials;

export type RemindUserData = {
  email: string;
};
export type RemindUserDataContract = RemindUserData;

export type LoginDataCheckParams = {
  email: string;
};
export type LoginData = {
  registered?: boolean;
  amocrm?: boolean;
};
