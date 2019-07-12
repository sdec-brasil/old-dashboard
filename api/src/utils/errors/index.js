
function toJson(err) {
  const error = {
    name: err.name,
    message: err.message,
  };
  if (process.env.NODE_ENV !== 'production') {
    error.stacktrace = err.stack;
  }
  return { error };
}


class BaseError extends Error {
  constructor(message) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    this.message = message;
    this.custom = true;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor);
  }
}


class BadFilterError extends BaseError {
  constructor(message = undefined) {
    super(message || 'Filter query string badly formatted.');
    this.status = 400;
  }
}

class NotFoundError extends BaseError {
  constructor(model, query) {
    super(`${model} with ${query} not found.`);
    this.status = 404;
  }
}

class SequelizeDBError extends BaseError {
  constructor(message, stack) {
    super(message);
    this.stack = stack;
    this.status = 400;
  }
}


class AuthorizationError extends BaseError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}


export default {
  toJson,
  BadFilterError,
  NotFoundError,
  SequelizeDBError,
  AuthorizationError,
};
