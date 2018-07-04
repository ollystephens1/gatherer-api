import express from 'express';
import activities from './controllers/activities.controller';
const router = express.Router();

router.get('/', activities.find);
router.get('/:id', activities.findOne);
router.post('/', activities.add);
router.put('/', activities.update);
router.delete('/:id', activities.remove);

export default router;
