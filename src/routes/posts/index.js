import express from 'express';
import resource from '@core/resource'; // eslint-disable-line
import dataSource from './data_source';

const router = express.Router();

router.use((req, res, next) => {
  req.dataSource = dataSource;
  next();
});

router.use(resource);

export default router;
