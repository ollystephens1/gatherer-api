import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import response from '@core/response/response';
import users from './modules/users';
import clients from './modules/clients';
import projects from './modules/projects';
import requirements from './modules/requirements';
import activities from './modules/activities';
import AuthMiddleware from '@auth/passport';

AuthMiddleware(passport);
const router = express.Router();

router.use('/users', users);
router.use('/clients', clients);
router.use('/projects', projects);
router.use('/requirements', requirements);
router.use('/activities', activities);

/**
 * Handle Login
 */
router.post('/login', passport.authenticate('jwt-login', { session: false }), (req, res) => {
  const user = req.user;

  req.login(user, { session: false }, (err) => {
    if (err) {
      res.send(err);
    }

    // Generates a signed web token with the contents of user object
    const token = jwt.sign({ user: user.name }, 'your_jwt_secret');
    response(res, { token, user });
  });
});

export default router;
