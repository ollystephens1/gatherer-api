import express from 'express';
import config from 'config';

const router = express.Router();

const createValidation = () => (req, res, next) => (req.createValidation
  ? req.createValidation(req, res, next)
  : next());

const editValidation = () => (req, res, next) => (req.editValidation
  ? req.editValidation(req, res, next)
  : next());

export const paginationHeaders = (res, count, page, limit) => {
  res.set('X-Pagination-Count', Math.ceil(count / limit));
  res.set('X-Pagination-Limit', limit);
  res.set('X-Pagination-Page', page);
};

/**
 * Creates a new resource with a dataSource.
 * Model will resolve Promises and functions too. Function will received the req, res and next function from
 * express middleware.
 *
 * @param {object|function|Promise} model The model that follows the model interface for crud operations
 * @returns Router
 */
export default (model) => {
  router.use((req, res, next) => {
    if (model.then !== undefined && model.catch !== undefined) {
      model
        .then((dataSource) => {
          req.dataSource = dataSource;
          next();
        })
        .catch(err => next(err));
      return;
    }

    req.dataSource = typeof model === 'function' ? model(req, res, next) : model;
    next();
  });

  router.get('/', ({ dataSource, query }, res, next) => {
    const { max, limit } = config.get('pagination');
    const reqLimit = query.limit || limit;
    const page = query.page || 1;
    const promises = [
      dataSource.find({ ...query, page, limit: reqLimit > max ? max : reqLimit }),
      dataSource.count(query)
    ];

    Promise.all(promises)
      .then(([docs, count]) => {
        paginationHeaders(res, count, page, limit);
        res.json(docs);
      })
      .catch(next);
  });

  router.get('/:id', ({ dataSource, params }, res, next) => {
    dataSource.findOne(params.id)
      .then(doc => res.json(doc))
      .catch(next);
  });

  router.post('/', createValidation(), ({ dataSource, body, originalUrl }, res, next) => {
    dataSource.insertOne(body)
      .then((result) => {
        res.set('Location', `${originalUrl.split('?')[0]}/${result.insertedId}`);
        res.status(201).end();
      })
      .catch(next);
  });

  router.put('/:id', editValidation(), ({ dataSource, body, params }, res, next) => {
    dataSource.updateOne(params.id, body)
      .then(() => res.end())
      .catch(next);
  });

  router.delete('/:id', ({ dataSource, params }, res, next) => {
    dataSource.deleteOne(params.id)
      .then(() => res.end())
      .catch(next);
  });

  return router;
};
