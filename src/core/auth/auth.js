import passport from 'passport';
import AuthMiddleware from './passport';
AuthMiddleware(passport);

export default {
  authorize
};

function authorize(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Check for JWT
    return passport.authenticate('jwt', { session: false }, (arg1, user, err)  => {
      if (err || !user) {
        return sendUnauthorizedResponse(res);
      }
      return next();
    })(req, res, next);
  }
}