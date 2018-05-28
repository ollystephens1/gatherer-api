import { put, get } from './memory';

export default () => (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const key = `__express__${req.originalUrl}`;
  const cacheContent = get(key);
  if (cacheContent) {
    return res.json(cacheContent);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    put(key, body);
    res.sendResponse(body);
  };
  return next();
};
