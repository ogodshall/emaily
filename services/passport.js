const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  // Passport uses different "strategies" for different login methods
  // There's a Facebook strategy, a Twitter strategy, etc.
  // Here, we're using Google, which requires an ID, a Secret and a callback
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // We also pass the strategy a callback function, telling us what to do
    // with the info that is returned
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record of the given profile.id
          // call done(), which takes an error as the first argument
          // and the relevant record as the second argument
          done(null, existingUser);
        } else {
          // no record for the profile.id, so make a new record
          // then call done() in the same manner as above
          new User({ googleId: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);
