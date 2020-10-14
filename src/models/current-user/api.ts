import { ApiRequest } from '@/interfaces';

import { callApi, withJsonContent } from '@/utils/call-api';
import { API_HOST_URL } from '@/utils/constants';

import {
  CurrentUserDataContract,
  CreatePartnerCredentialsContract,
  LoginCredentialsContract,
  RegisterCredentialsContract,
  RemindUserDataContract,
  LoginDataCheckParams,
  LoginData,
} from './types';

const checkUserRequest: ApiRequest<void, CurrentUserDataContract> = async () => {
  return callApi(`${API_HOST_URL}/user/CHECK_AUTH`, {
    mode: 'cors',
    credentials: 'include',
  });
};

const checkLoginRequest: ApiRequest<LoginDataCheckParams, LoginData> = async (data) => {
  return callApi(
    `${API_HOST_URL}/user/CHECK_LOGIN`,
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
    `${API_HOST_URL}/user/REMIND`,
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
    `${API_HOST_URL}/user/REGISTER`,
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
    `${API_HOST_URL}/user/LOGIN`,
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
    `${API_HOST_URL}/user/CREATE_PARTNER_ACCOUNT`,
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
