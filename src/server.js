import express from 'express';
import config from 'config';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import timeout from 'connect-timeout';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
import log from '@core/logger';
import database from '@core/database';
import posts from './resources/posts';
import cacheMiddleware from '@core/cache'; // eslint-disable-line

const PORT = config.get('server.port');
const CLIENT = config.get('client');

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: config.get('server.bodyParserLimit') }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(timeout(config.get('server.timeout')));
app.use(responseTime());
app.use(cacheMiddleware());
app.use(database());

app.get('/', (req, res) => res.json({ status: 'OK', code: 200 }));
app.use('/posts', posts);

// 404 hanlder
app.use((req, res, next) => {
  const err = new Error('404 Not Found');
  err.code = 404;
  next(err);
});

// Error hanlder
app.use((err, req, res) => {
  err.code = err.status || err.code || 500;
  res.status(err.code).json({
    code: err.code,
    msg: err.message
  });
});

app.listen(PORT, () => log.info(`${CLIENT.name} running on port ${PORT}`));

export default app;
