/* eslint-disable no-console */
import { types, flow } from 'mobx-state-tree';
import { AsyncReturnType } from 'type-fest';

import assign from 'lodash/assign';
import values from 'lodash/values';

import {
  checkUserRequest,
  checkLoginRequest,
  loginRequest,
  registerRequest,
  remindRequest,
  createPartnerRequest,
} from './api';
import { PartnerStatuses } from './constants';
import {
  mapCurrentUserDataRes,
  mapCreatePartnerCredentialsReq,
  mapRegisterCredentialsReq,
} from './mappers';
import {
  LoginData,
  CreatePartnerCredentials,
  RegisterCredentials,
  LoginCredentials,
  RemindUserData,
  LoginDataCheckParams,
} from './types';

const $user = types.model('UserDataModel', {
  id: types.string,
  email: types.string,
  name: types.string,
});

const $partnerAccount = types.model('PartnerAccountDataModel', {
  id: types.string,
  name: types.string,
  companyName: types.string,
  status: types.enumeration('PartnerStatuses', values(PartnerStatuses)),
  pid: types.number,
});

export const $currentUser = types
  .model('CurrentAccount', {
    $user: types.maybeNull($user),
    $partnerAccount: types.maybeNull($partnerAccount),
    state: types.optional(
      types.enumeration('State', ['empty', 'pending', 'done', 'error']),
      'empty'
    ),
  })
  .views((mstSelf) => ({
    get isAuthorized() {
      return !!mstSelf.$user?.id;
    },
  }))
  .actions((mstSelf) => {
    const update = flow(function* updateCurrentUserFlow() {
      mstSelf.state = 'pending';

      try {
        const currentUserResult: AsyncReturnType<typeof checkUserRequest> = yield checkUserRequest();

        const currentUserData = mapCurrentUserDataRes(currentUserResult.data);

        console.log(currentUserData);

        mstSelf.$user = currentUserData.user;
        mstSelf.$partnerAccount = currentUserData.partnerAccount;
        mstSelf.state = 'done';
      } catch (err) {
        console.error('Failed to update current user', err);
        mstSelf.state = 'error';
      }
    });

    const checkLogin = flow<LoginData, [LoginDataCheckParams]>(function* checkLoginFlow(
      loginDataCheckParams
    ) {
      mstSelf.state = 'pending';

      let loginData: LoginData = {};

      try {
        const loginDataResult: AsyncReturnType<typeof checkLoginRequest> = yield checkLoginRequest(
          loginDataCheckParams
        );

        loginData = assign({}, loginData, loginDataResult?.data);

        mstSelf.state = 'done';
      } catch (err) {
        console.error('Failed to check login', err);
        mstSelf.state = 'error';
      }

      return loginData;
    });

    const loginUser = flow<void, [LoginCredentials]>(function* loginUserFlow(loginCredentials) {
      mstSelf.state = 'pending';

      try {
        const currentUserResult: AsyncReturnType<typeof loginRequest> = yield loginRequest(
          loginCredentials
        );

        const currentUserData = mapCurrentUserDataRes(currentUserResult.data);

        mstSelf.$user = currentUserData.user;
        mstSelf.$partnerAccount = currentUserData.partnerAccount;
        mstSelf.state = 'done';
      } catch (err) {
        console.error('Failed to login', err);
        mstSelf.state = 'error';
      }
    });

    const registerUser = flow<void, [RegisterCredentials]>(function* registerUserFlow(
      registerCredentials
    ) {
      mstSelf.state = 'pending';

      try {
        const currentUserResult: AsyncReturnType<typeof registerRequest> = yield registerRequest(
          mapRegisterCredentialsReq(registerCredentials)
        );

        const currentUserData = mapCurrentUserDataRes(currentUserResult.data);

        mstSelf.$user = currentUserData.user;
        mstSelf.$partnerAccount = currentUserData.partnerAccount;
        mstSelf.state = 'done';
      } catch (err) {
        console.error('Failed to register', err);
        mstSelf.state = 'error';
      }
    });

    const remindUser = flow<void, [RemindUserData]>(function* remindUserFlow(remindUserData) {
      mstSelf.state = 'pending';

      try {
        yield remindRequest(remindUserData);

        mstSelf.state = 'done';
      } catch (err) {
        console.error('Failed to remind', err);
        mstSelf.state = 'error';
      }
    });

    const createPartner = flow<void, [CreatePartnerCredentials]>(function* createPartnerFlow(
      createPartnerCredentials
    ) {
      mstSelf.state = 'pending';

      try {
        const currentUserResult: AsyncReturnType<typeof createPartnerRequest> = yield createPartnerRequest(
          mapCreatePartnerCredentialsReq(createPartnerCredentials)
        );

        const currentUserData = mapCurrentUserDataRes(currentUserResult.data);

        mstSelf.$user = currentUserData.user;
        mstSelf.$partnerAccount = currentUserData.partnerAccount;
        mstSelf.state = 'done';
      } catch (err) {
        console.error('Failed to create partner', err);
        mstSelf.state = 'error';
      }
    });

    return { update, checkLogin, loginUser, registerUser, remindUser, createPartner };
  });
