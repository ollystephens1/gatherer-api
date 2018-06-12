import log from '@core/logger';
import { internal } from './errors';

/**
 * Normalise error
 * @param {Error} err
 */
const cleanError = err => err.code ? err : internal(err, undefined);

/**
 * Handle all API errors
 * @param {Error} err
 * @param {Object} req
 * @param {Object} res
 */
export default (err, req, res, next) => { // eslint-disable-line no-unused-vars
  err = cleanError(err);

  const response = {
    code: err.code || err.status || 500,
    message: err.message
  };

  log.verbose(response.message);
  res.status(err.code).json(response);
  res.end();
};
