import express from 'express';

const router = express.Router();

const createValidation = () => (req, res, next) => (req.createValidation
  ? req.createValidation(req, res, next)
  : next());

const editValidation = () => (req, res, next) => (req.editValidation
  ? req.editValidation(req, res, next)
  : next());

router.get('/', ({ dataSource }, res, next) => {
  dataSource.find()
    .then(docs => res.json(docs))
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
      res.set('Location', `${originalUrl}/${result.insertedId}`);
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

export default router;
