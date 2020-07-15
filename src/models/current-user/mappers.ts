import replace from 'lodash/replace';

import { PartnerStatuses } from './constants';
import {
  CurrentUserDataContract,
  CurrentUserData,
  CreatePartnerCredentials,
  CreatePartnerCredentialsContract,
  RegisterCredentials,
  RegisterCredentialsContract,
} from './types';

const cleanupPhone = (phoneWithMask: string) => {
  return replace(phoneWithMask, /\D/g, '');
};

const parentStatusesMap = {
  0: PartnerStatuses.NONE,
  1: PartnerStatuses.CREATED,
  2: PartnerStatuses.APPROVED,
  3: PartnerStatuses.DECLINED,
};

const mapCurrentUserDataRes = (responseData: CurrentUserDataContract): CurrentUserData => {
  const { user: responseUser, partner_account: responsePartnerAccount } = responseData;

  let mappedName = null;
  let mappedPartnerAccount = null;

  if ('id' in responseUser) {
    mappedName = {
      id: responseUser.id,
      email: responseUser.email,
      name: responseUser.name,
    };
  }

  if (responsePartnerAccount) {
    mappedPartnerAccount = {
      id: responsePartnerAccount.id,
      name: responsePartnerAccount.name,
      companyName: responsePartnerAccount.companyName,
      status: parentStatusesMap[responsePartnerAccount.status],
      pid: responsePartnerAccount.pid,
    };
  }

  return {
    user: mappedName,
    partnerAccount: mappedPartnerAccount,
  };
};

const mapCreatePartnerCredentialsReq = (
  createPartnerCredentials: CreatePartnerCredentials
): CreatePartnerCredentialsContract => {
  return {
    name: createPartnerCredentials.name,
    phone: cleanupPhone(createPartnerCredentials.phone),
    company_name: createPartnerCredentials.companyName,
  };
};

const mapRegisterCredentialsReq = (
  registerCredentials: RegisterCredentials
): RegisterCredentialsContract => {
  return {
    email: registerCredentials.email,
    name: registerCredentials.name,
    last_name: registerCredentials.lastName,
    account_name: registerCredentials.accountName,
    phone: cleanupPhone(registerCredentials.phone),
    password: registerCredentials.password,
  };
};

export { mapCurrentUserDataRes, mapCreatePartnerCredentialsReq, mapRegisterCredentialsReq };
