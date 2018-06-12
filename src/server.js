import express from 'express';
import config from 'config';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import connectTimeout from 'connect-timeout';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
import log from '@core/logger';
import database from '@core/database';
import cacheMiddleware from '@core/cache';
import { notFound, ErrorHandler } from '@core/error';
import memoryCache from '@core/cache/memory';
import urlParser from '@core/url';
import posts from './resources/posts';

const client = config.get('client');
const { port, timeout, bodyParserLimit } = config.get('server');
const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: bodyParserLimit }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlParser());
app.use(connectTimeout(timeout));
app.use(responseTime());
app.use(cacheMiddleware(memoryCache));
app.use(database());

app.get('/', (req, res) => res.json({ status: 'OK', code: 200 }));
app.use('/posts', posts);

// Handle unknown endpoints
app.use((req, res, next) => {
  next(notFound('Unknown endpoint'));
});

// Handle All other API errors
app.use(ErrorHandler);

app.listen(port, () => log.info(`${client.name} running on port ${port}`));

export default app;
