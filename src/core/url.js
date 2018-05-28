import url from 'url';

export default () => (req, res, next) => {
  req.fullUrl = url.parse(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
};
