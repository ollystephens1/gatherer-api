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
