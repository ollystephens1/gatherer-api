import config from 'config';

const cacheConfig = config.get('cache.stdTTL');

export default cache => (req, res, next) => {
  const key = `__express__${req.originalUrl}`;

  if (req.method === 'PURGE') {
    cache.purge(key);
    return res.end();
  }

  if (req.method !== 'GET') {
    cache.purge(key); // If its update/delete purge the key so we don't serve outdated data
    return next();
  }

  const cacheControl = req.get('Cache-Control') || '';
  if (cacheControl.toLowerCase() === 'no-cache') {
    return next();
  }

  const cacheContent = cache.get(key);
  if (cacheContent) {
    return res.json(cacheContent);
  }

  const regx = new RegExp('max-age');
  const ttl = regx.test(cacheControl)
    ? cacheControl.split('=')[1]
    : cacheConfig;

  const timeout = ttl > 0 ? ttl : 1;

  res.sendResponse = res.json;
  res.json = (body) => {
    cache.put(key, body, timeout);
    res.sendResponse(body);
  };
  return next();
};
