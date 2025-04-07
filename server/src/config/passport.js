const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// Local Strategy (username/password)
passport.use(new LocalStrategy(
  {
    usernameField: 'email',   // could be either email or username
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Check if email is actually a username
      const user = await User.findOne({
        $or: [
          { email: email },
          { username: email }
        ]
      });

      if (!user) {
        console.log('No user found with email/username:', email);
        return done(null, false, { message: 'Invalid credentials' });
      }

      // Check if user is active
      if (!user.active) {
        console.log('User account is inactive:', email);
        return done(null, false, { message: 'Account is inactive' });
      }

      // Verify password
      console.log('Comparing passwords...');
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log('Password mismatch for:', email);
        return done(null, false, { message: 'Invalid credentials' });
      }

      console.log('User authenticated successfully:', user.username);
      return done(null, user);
    } catch (error) {
      console.error('Authentication error:', error);
      return done(error);
    }
  }
));

// JWT Strategy (for token authentication)
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'nalaladnjnijnwninvinisvnihwnvhunwhduvnuhncvhudnvhudnhuvbushvuhsh'
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);

    if (!user) {
      return done(null, false);
    }

    if (!user.active) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;