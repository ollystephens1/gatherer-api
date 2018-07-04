import express from 'express';
import users from './modules/users';
import clients from './modules/clients';
import projects from './modules/projects';
const router = express.Router();

router.use('/users', users);
router.use('/clients', clients);
router.use('/projects', projects);

export default router;
