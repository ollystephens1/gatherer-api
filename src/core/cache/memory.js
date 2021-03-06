import config from 'config';
import cache from 'memory-cache';

const engine = new cache.Cache({
  stdTTL: config.get('cache.stdTTL'),
  checkperiod: config.get('cache.checkperiod'),
});

const put = (key, body, ttl) => engine.put(key, JSON.stringify(body), ttl);

const purge = key => engine.del(key);

const get = key => JSON.parse(engine.get(key));

export default { put, purge, get };
