import express from 'express';
import users from './controllers/users.controller';
const router = express.Router();

router.get('/', users.find);
router.get('/:id', users.findOne);
router.post('/', users.add);
router.put('/', users.update);
router.delete('/:id', users.remove);

export default router;
