# ClearPeaks API seed

### Quick start

Install dependencies

`yarn`

Launch API in development mode (live reload on changes)

`npm run start`

Build API for production

`npm run build:prod`

Run API production build

`npm run start:prod`

### Environment configuration

For default config (i.e. development), set in ./config/default.json

Production config can be set in ./config/production.json and will be merged with the default config.

To access environment config variables, do as follows:

`import config from 'config';`

`const { port, timeout } = config.get('server')`;

[Read more](https://www.npmjs.com/package/config)

### Testing

Run Mocha / Chai tests

`npm run test`

### Deployment with PM2

Once the app is bundled for production, deploy and test with PM2.

To set a new process with PM2 (pointing to production bundle)

`NODE_ENV=production ./node_modules/.bin/pm2 start dist/server.bundle.js --name=seed-api`

Replace `name` with whatever you wish to call the process.

`pm2 start seed-api` - Start daemonized API

Then simply navigate to your specified production port locally (see Config section)

`pm2 stop seed-api` - Stop daemonized API

`pm2 reload seed-api` - Reload (stop & start) daemonized API

`pm2 list` - Show all processes

[Read more about PM2](http://pm2.keymetrics.io/docs/usage/quick-start/)

### Logging

Use the custom logger for multi-level logging.

`import 'log' from '@core/logger'`

Log levels in order of importance:

`log.error('This is an error');`

`log.warn('This is an warning');`

`log.info('This is some important information');`

`log.verbose('This is a message');`

`log.debug('This is some debug');`

`log.silly('This is some random');`

Errors and warnings are logged to a log file by date/time.

### Error handling

Errors thrown as above will be caught by common API error handling middleware

`app.use(errorHandler);`

Use common error handlers for specific cases:

````
import { badRequest } from '@core/error';
if (!req.query.someId) {
  throw badRequest('Please provide someId');
}
```