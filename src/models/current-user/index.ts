/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
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
  .views((self) => ({
    get isAuthorized() {
      return !!self.$user?.id;
    },
  }))
  .actions((self) => {
    const update = flow(function* updateCurrentUserFlow() {
      self.state = 'pending';

      try {
        const currentUserResult: AsyncReturnType<typeof checkUserRequest> = yield checkUserRequest();

        const currentUserData = mapCurrentUserDataRes(currentUserResult.data);

        console.log(currentUserData);

        self.$user = currentUserData.user;
        self.$partnerAccount = currentUserData.partnerAccount;
        self.state = 'done';
      } catch (err) {
        console.error('Failed to update current user', err);
        self.state = 'error';
      }
    });

    const checkLogin = flow<LoginData, [LoginDataCheckParams]>(function* checkLoginFlow(
      loginDataCheckParams
    ) {
      self.state = 'pending';

      let loginData: LoginData = {};

      try {
        const loginDataResult: AsyncReturnType<typeof checkLoginRequest> = yield checkLoginRequest(
          loginDataCheckParams
        );

        loginData = assign({}, loginData, loginDataResult?.data);

        self.state = 'done';
      } catch (err) {
        console.error('Failed to check login', err);
        self.state = 'error';
      }

      return loginData;
    });

    const loginUser = flow<void, [LoginCredentials]>(function* loginUserFlow(loginCredentials) {
      self.state = 'pending';

      try {
        const currentUserResult: AsyncReturnType<typeof loginRequest> = yield loginRequest(
          loginCredentials
        );

        const currentUserData = mapCurrentUserDataRes(currentUserResult.data);

        self.$user = currentUserData.user;
        self.$partnerAccount = currentUserData.partnerAccount;
        self.state = 'done';
      } catch (err) {
        console.error('Failed to login', err);
        self.state = 'error';
      }
    });

    const registerUser = flow<void, [RegisterCredentials]>(function* registerUserFlow(
      registerCredentials
    ) {
      self.state = 'pending';

      try {
        const currentUserResult: AsyncReturnType<typeof registerRequest> = yield registerRequest(
          mapRegisterCredentialsReq(registerCredentials)
        );

        const currentUserData = mapCurrentUserDataRes(currentUserResult.data);

        self.$user = currentUserData.user;
        self.$partnerAccount = currentUserData.partnerAccount;
        self.state = 'done';
      } catch (err) {
        console.error('Failed to register', err);
        self.state = 'error';
      }
    });

    const remindUser = flow<void, [RemindUserData]>(function* remindUserFlow(remindUserData) {
      self.state = 'pending';

      try {
        yield remindRequest(remindUserData);

        self.state = 'done';
      } catch (err) {
        console.error('Failed to remind', err);
        self.state = 'error';
      }
    });

    const createPartner = flow<void, [CreatePartnerCredentials]>(function* createPartnerFlow(
      createPartnerCredentials
    ) {
      self.state = 'pending';

      try {
        const currentUserResult: AsyncReturnType<typeof createPartnerRequest> = yield createPartnerRequest(
          mapCreatePartnerCredentialsReq(createPartnerCredentials)
        );

        const currentUserData = mapCurrentUserDataRes(currentUserResult.data);

        self.$user = currentUserData.user;
        self.$partnerAccount = currentUserData.partnerAccount;
        self.state = 'done';
      } catch (err) {
        console.error('Failed to create partner', err);
        self.state = 'error';
      }
    });

    return { update, checkLogin, loginUser, registerUser, remindUser, createPartner };
  });
