import express from 'express';
import projects from './controllers/projects.controller';
const router = express.Router();

router.get('/', projects.find);
router.get('/:id', projects.findOne);
router.post('/', projects.add);
router.put('/', projects.update);
router.delete('/:id', projects.remove);

export default router;
