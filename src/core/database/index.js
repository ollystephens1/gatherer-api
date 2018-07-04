import log from '@core/logger';
import mongoose from 'mongoose';
import config from 'config';

const { host, port, dbName, user, pass } = config.get('db');

export default function db() {
	mongoose.connect(
		`mongodb://${host}:${port}/${dbName}`,
		{},
		err => {
			if (err) {
				log.warn(`Error connecting to Mongo: ${err.message}`);
				return;
			}

			log.info(`Successfully connected to Mongo`);
		}
	);
}
