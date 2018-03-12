import express from 'express';
import config from 'config';
import helmet from 'helmet';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes';

const PORT = config.get('server.port');
const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json({
  limit: config.get('server.bodyParserLimit')
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.listen(PORT, () => console.log(`Node API running on port ${PORT}`));
