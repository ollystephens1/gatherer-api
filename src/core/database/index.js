const fakeConnection = () => Promise.resolve({
  close() {
    return null;
  },
});

/*
 * Here we should add the connection to your database.
 * Once you have the connection add that connection to
 * the request and remember to close it when the response
 * if finished.
 */
export default () => (req, res, next) => {
  fakeConnection()
    .then((connection) => {
      res.on('finish', () => connection.close());
      req.db = connection;
      next();
    })
    .catch(err => next(err));
};
