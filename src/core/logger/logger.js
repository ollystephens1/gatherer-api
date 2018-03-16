import fs from 'fs-extra';
import winston from 'winston';
import moment from 'moment';

const time = () => moment().format('HH:mm:ss');
const day = () => moment().format('YYYY-MM-DD');

/**
 * ---------------
 * Generic logger
 * ===============
 *
 * Import and use as follows:
 * --------------------------
 *
 * import log from '@core/logger;
 *
 * log.error('This is an error');  <--- Red         (console & file)
 * log.warn('This is a warning');  <--- Yellow      (console & file)
 * log.info('This is some info');  <--- Green       (console)
 * log.verbose('This is general'); <--- Light-blue  (console)
 * log.debug('this is a test');    <--- Dark-blue   (console)
 * log.silly('this is a test');    <--- Purple      (console)
 *
 *
 * More info:
 * ----------
 *
 * Node log levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 *
 * Summary:
 * --------
 * Logs all to console.
 * Logs errors & warnings to logfile (by date)
 * Log files per project & date in <project>/logs/<date>.log
 *
 * @type {Class}
 */
export default function(level = 'warn') {
  fs.ensureDirSync('log');

  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        timestamp: time,
        colorize: true,
        level: 'silly' // Everything to console
      }),
      new (winston.transports.File)({
        filename: `log/${day()}.log`,
        timestamp: time,
        level
      })
    ]
  });
}
