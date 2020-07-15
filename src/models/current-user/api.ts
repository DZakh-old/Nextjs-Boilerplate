// TODO:
// import { ApiRequest } from '@/interfaces';
// import { callApi, withJsonContent } from '@/utils/call-api';
import noop from 'lodash/noop';

import {
  CurrentUserDataContract,
  CreatePartnerCredentialsContract,
  LoginCredentialsContract,
  RegisterCredentialsContract,
  RemindUserDataContract,
  LoginDataCheckParams,
  LoginData,
} from './types';

type ApiRequest = any;
const callApi = noop;
const withJsonContent = noop;

const checkUserRequest: ApiRequest<void, CurrentUserDataContract> = async () => {
  return callApi(`v1/user/CHECK_AUTH`, {
    mode: 'cors',
    credentials: 'include',
  });
};

const checkLoginRequest: ApiRequest<LoginDataCheckParams, LoginData> = async (data) => {
  return callApi(
    `v1/user/CHECK_LOGIN`,
    withJsonContent({
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
  );
};

const remindRequest: ApiRequest<RemindUserDataContract, null> = async (data) => {
  return callApi(
    `v1/user/REMIND`,
    withJsonContent({
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
  );
};

const registerRequest: ApiRequest<RegisterCredentialsContract, CurrentUserDataContract> = async (
  data
) => {
  return callApi(
    `v1/user/REGISTER`,
    withJsonContent({
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
  );
};

const loginRequest: ApiRequest<LoginCredentialsContract, CurrentUserDataContract> = async (
  data
) => {
  return callApi(
    `v1/user/LOGIN`,
    withJsonContent({
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
  );
};

const createPartnerRequest: ApiRequest<
  CreatePartnerCredentialsContract,
  CurrentUserDataContract
> = async (data) => {
  return callApi(
    `v1/user/CREATE_PARTNER_ACCOUNT`,
    withJsonContent({
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
  );
};

export {
  checkLoginRequest,
  checkUserRequest,
  remindRequest,
  registerRequest,
  loginRequest,
  createPartnerRequest,
};
