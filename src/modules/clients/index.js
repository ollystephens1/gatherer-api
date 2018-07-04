import express from 'express';
import clients from './controllers/clients.controller';
const router = express.Router();

router.get('/', clients.find);
router.get('/:id', clients.findOne);
router.post('/', clients.add);
router.put('/', clients.update);
router.delete('/:id', clients.remove);

export default router;
