import express from 'express';
import config from 'config';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import connectTimeout from 'connect-timeout';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
import log from '@core/logger';
import './schemas';
import database from '@core/database';
import { notFound, ErrorHandler } from '@core/error';
import routes from './routes';

const client = config.get('app');
const { port, timeout, bodyParserLimit } = config.get('server');
const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: bodyParserLimit }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(connectTimeout(timeout));
app.use(responseTime());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Expose-Headers', 'X-Total-Pages, Cache-Control, Expires, Pragma');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE, HEAD');
	next();
});
  
database();

app.use('/', routes);

// Handle unknown endpoints
app.use((req, res, next) => {
	next(notFound('Unknown endpoint'));
});

// Handle All other API errors
app.use(ErrorHandler);

app.listen(port, () => log.info(`${client.name} running on port ${port}`));

export default app;
