/* eslint-disable max-classes-per-file */

type ErrorType = unknown;
type FetchErrorPropsType = {
  error: ErrorType;
  retries: number;
};
type HttpErrorPropsType = {
  response: Response;
};

class MyError extends Error {
  name: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, MyError);
  }
}

class FetchError extends MyError {
  error: ErrorType;

  retries: number;

  constructor({ error, retries }: FetchErrorPropsType) {
    super(`Fetch error after ${retries} retries.`);
    this.error = error;
    this.retries = retries;
  }
}

class HttpError extends MyError {
  response: Response;

  constructor({ response }: HttpErrorPropsType) {
    super(response.statusText || 'Http error.');
    this.response = response;
  }
}

export { FetchError, HttpError };
