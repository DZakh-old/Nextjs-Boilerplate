/* eslint-disable max-classes-per-file */

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, MyError);
  }
}

class FetchError extends MyError {
  constructor({ error, retries }) {
    super(`Fetch error after ${retries} retries.`);
    this.error = error;
    this.retries = retries;
  }
}

class HttpError extends MyError {
  constructor({ response }) {
    super(response.statusText || 'Http error.');
    this.response = response;
  }
}

export { FetchError, HttpError };
