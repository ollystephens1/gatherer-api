import express from 'express';
import requirements from './controllers/requirements.controller';
const router = express.Router();

router.get('/', requirements.find);
router.get('/:id', requirements.findOne);
router.post('/', requirements.add);
router.put('/', requirements.update);
router.delete('/:id', requirements.remove);

export default router;
