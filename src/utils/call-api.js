import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';

import { assignIn, get } from 'lodash';

import { FetchError, HttpError } from '@/utils/errors';
import { isServer } from '@/utils/helpers';
import { isomorphicRedirect } from '@/utils/router-utils';

const NUMBER_OF_FETCH_RETRIES = 3;
const RETRY_DELAY = 1000;
const UNAUTHORIZED_HTTP_STATUS = 401;

let serverSideCtx = null;
function storeServerSideCtx(newServerSideCtx) {
  serverSideCtx = newServerSideCtx;
}

function withJsonContent(options) {
  return {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  };
}

const callApi = async (url, requestOptions = {}, retries = 0) => {
  let data = null;
  let response = null;

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

    response = await fetch(url, requestOptionsWithCookie).catch((err) => {
      throw new FetchError({ error: err, retries });
    });

    if (isServer) {
      serverSideCtx.res.setHeader('Set-Cookie', response.headers.raw()['set-cookie']);
    }

    try {
      data = await response.json();
    } catch (err) {
      data = null;
    }

    // eslint-disable-next-line camelcase
    if (data && data.redirect_to) {
      isomorphicRedirect(data.redirect_to, serverSideCtx);
    }

    if (!response.ok) {
      throw new HttpError({ response });
    }

    return { response, data };
  } catch (error) {
    switch (true) {
      case error instanceof FetchError && error.retries < NUMBER_OF_FETCH_RETRIES:
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(callApi(url, requestOptions, retries + 1));
          }, RETRY_DELAY * (retries + 1));
        });
      case error instanceof HttpError && error.response.status === UNAUTHORIZED_HTTP_STATUS:
        isomorphicRedirect('/', serverSideCtx);
        return { response, data, error };
      default:
        return { response, data, error };
    }
  }
};

export { storeServerSideCtx, withJsonContent, callApi };
