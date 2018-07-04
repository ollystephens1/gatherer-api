import express from 'express';
import users from './modules/users';
import clients from './modules/clients';
import projects from './modules/projects';
import requirements from './modules/requirements';
import activities from './modules/activities';
const router = express.Router();

router.use('/users', users);
router.use('/clients', clients);
router.use('/projects', projects);
router.use('/requirements', requirements);
router.use('/activities', activities);

export default router;
