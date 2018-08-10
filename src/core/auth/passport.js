import mongoose from 'mongoose';
import Local from 'passport-local';
import passportJWT from 'passport-jwt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default (passport) => {
  const User = mongoose.model('User');

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // =========================================================================
  // JWT LOGIN ===============================================================
  // =========================================================================
  // Using algorithm HS384
  passport.use('jwt-login', new Local.Strategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },

  (req, email, password, done) => {

    // callback with email and password from our form
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'email': normalizeEmail(email) }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err) {
        return done(err);
      }

      // if no user is found, return the message
      if (!user) {
        console.log('ACTIVITY: Not found');
        return done(null, false); // req.flash is the way to set flashdata using connect-flash
      }

      // if user is not active - return false
      if (user.active === false) {
        console.log('ACTIVITY: User inactive');
        return done(null, false); // req.flash is the way to set flashdata using connect-flash
      }

      // if the user is found but the password is wrong
      if (!user.validPassword(password)) {
        console.log('ACTIVITY: Invalid password');
        return done(null, false);
      }

      console.log('ACTIVITY: Logged in');
      user.password = '';

      // all is well, return successful user
      return done(null, user);
    });
  }));

  // =========================================================================
  // JWT auth middleware ======================================================
  // ==========================================================================
  // This is used to authorize protected routes in the API (when JWT is found)
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
  }, function (jwtPayload, cb) {
    return cb(null, jwtPayload);
    }
  ));

  function normalizeEmail(email) {
    return email.toLowerCase();
  }
};
