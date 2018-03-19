import express from 'express';
import config from 'config';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import log from '@core/logger';
import timeout from 'connect-timeout';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes';

const PORT = config.get('server.port');
const CLIENT = config.get('client');

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: config.get('server.bodyParserLimit') }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(timeout(config.get('server.timeout')));

app.use('/', routes);
app.listen(PORT, () => log.info(`${CLIENT.name} running on port ${PORT}`));

export default app;
