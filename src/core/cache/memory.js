import config from 'config';
import cache from 'memory-cache';

const engine = new cache.Cache({
  stdTTL: config.get('cache.stdTTL'),
  checkperiod: config.get('cache.checkperiod'),
});

export const put = (key, body) => engine.put(key, JSON.stringify(body));

export const purge = key => engine.del(key);

export const get = key => JSON.parse(engine.get(key));
