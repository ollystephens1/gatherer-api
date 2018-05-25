import express from 'express';
import config from 'config';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import connectTimeout from 'connect-timeout';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
import log from '@core/logger'; // eslint-disable-line
import database from '@core/database'; // eslint-disable-line
import posts from './routes/posts';

const client = config.get('client');
const { port, timeout, bodyParserLimit } = config.get('server');
const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: bodyParserLimit }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(connectTimeout(timeout));
app.use(responseTime());
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

app.listen(port, () => log.info(`${client.name} running on port ${port}`));

export default app;
