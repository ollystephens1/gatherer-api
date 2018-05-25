import config from 'config';
import _cache from 'memory-cache';

const cache = new _cache.Cache({
  stdTTL: config.get('cache.stdTTL'),
  checkperiod: config.get('cache.checkperiod'),
});

const cacheMiddleware = () => (req, res, next) => {
  const key = `__express__${req.originalUrl}`;
  const cacheContent = JSON.parse(cache.get(key));
  if (cacheContent) {
    return res.json(cacheContent);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    cache.put(key, JSON.stringify(body));
    res.sendResponse(body);
  };
  return next();
};

export default cacheMiddleware;
