/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';

import assignIn from 'lodash/assignIn';
import get from 'lodash/get';

import { TODO_ANY } from '@/interfaces';

import { FetchError, HttpError } from '@/utils/errors';
import { isServer } from '@/utils/helpers';
import { isomorphicRedirect } from '@/utils/router-utils';

const NUMBER_OF_FETCH_RETRIES = 3;
const RETRY_DELAY = 1000;
const UNAUTHORIZED_HTTP_STATUS = 401;

let serverSideCtx: TODO_ANY = null;
function storeServerSideCtx(newServerSideCtx: TODO_ANY) {
  serverSideCtx = newServerSideCtx;
}

function withJsonContent(options: TODO_ANY): TODO_ANY {
  return {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  };
}

export type CallApi<D = any> = (
  url: string,
  requestOptions?: TODO_ANY,
  retries?: number
) => Promise<{
  response: Response;
  data: D;
}>;

const callApi: CallApi = async (url, requestOptions = {}, retries = 0) => {
  try {
    const requestOptionsWithCookie = {
      ...requestOptions,
      headers: assignIn(
        {},
        requestOptions.headers,
        serverSideCtx && {
          cookie: get(serverSideCtx, 'req.headers.cookie'),
        },
        Cookies.get('XSRF-TOKEN') && {
          'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        }
      ),
    };

    const response = await fetch(url, requestOptionsWithCookie).catch((err) => {
      throw new FetchError({ error: err, retries });
    });

    if (!response.ok) {
      throw new HttpError({ response });
    }

    if (isServer) {
      serverSideCtx.res.setHeader('Set-Cookie', (response.headers as any).raw()['set-cookie']);
    }

    let data;
    try {
      data = await response.json();
    } catch (err) {
      data = null;
    }

    // eslint-disable-next-line camelcase
    if (data?.redirect_to) {
      isomorphicRedirect(data.redirect_to, serverSideCtx);
    }

    return { response, data };
  } catch (err) {
    switch (true) {
      case err instanceof FetchError && err.retries < NUMBER_OF_FETCH_RETRIES:
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(callApi(url, requestOptions, retries + 1));
          }, RETRY_DELAY * (retries + 1));
        });
      case err instanceof HttpError && err.response.status === UNAUTHORIZED_HTTP_STATUS:
        isomorphicRedirect('/', serverSideCtx);
        throw err;
      default:
        throw err;
    }
  }
};

export { storeServerSideCtx, withJsonContent, callApi };
