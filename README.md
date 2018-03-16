# Node.js API seed (ES6 w/ Babel, Webpack & Nodemon)

Quick starter Node API Seed.

### Quick start

Install dependencies

`npm install`

Launch API in development mode (with Webpack & Nodemon live reloading)

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

`config.get('server.port');`

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
