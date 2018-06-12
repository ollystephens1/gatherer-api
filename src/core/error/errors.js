import httpStatus from 'http-status';

/**
 * Normalize error message
 * @param {Number} statusCode
 * @param {String} message
 */
const buildMessage = (statusCode, message = '') => {
  return message ? `${httpStatus[statusCode]} - ${message}` : httpStatus[statusCode];
};

/**
 * Build common API error
 * @param {Number} statusCode - HTTP status code
 * @param {Error} err - API Error
 */
const buildError = (statusCode = 500, err) => {
  let message = err;

  if (typeof message !== 'string') {
    message = err ? err.message : 'Unknown error';
  }

  const error = new Error(buildMessage(statusCode, message));

  error.name = 'API Error';
  error.code = statusCode;
  error.status = false;

  if (!error.stack) {
    Error.captureStackTrace(this, this);
  }

  return error;
};

export const badRequest = err => buildError(400, err);

export const unauthorized = err => buildError(401, err);

export const forbidden = err => buildError(403, err);

export const notFound = err => buildError(404, err);

export const internal = err => buildError(500, err);

export const unavailable = err => buildError(503, err);
