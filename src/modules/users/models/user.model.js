import mongoose from 'mongoose';
import crypto from 'crypto';
import config from 'config';

const passwordHash = config.get('server.passwordHash');

const userSchema = new mongoose.Schema(
	{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    description: { type: String },
    password: { type: String, required: true },
    avatar: { type: String }
	},
	{ timestamps: true, toJSON: { virtuals: true } }
);


// ---------------------
// Prehooks
// ---------------------
userSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  next();
});

// ---------------------
// Methods
// ---------------------
userSchema.methods.setPassword = function(password) {
  this.password =
    crypto
      .pbkdf2Sync(password, passwordHash, 1000, 64, 'sha1')
      .toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash =
    crypto
      .pbkdf2Sync(password, passwordHash, 1000, 64, 'sha1')
      .toString('hex');

  return this.password === hash;
};

export default mongoose.model('User', userSchema);
