import express from 'express';
import users from './modules/users';
import clients from './modules/clients';
const router = express.Router();

router.use('/users', users);
router.use('/clients', clients);

export default router;
