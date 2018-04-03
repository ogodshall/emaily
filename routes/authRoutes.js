const passport = require('passport');

// Routes involved in the login/logout process
module.exports = app => {
  // This is the initial request to login
  // Sends us into Google OAuth
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // Callback required by the Google OAuth process
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // Logs the user out, empties the token from their cookie
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Lists the user info for the current users, confirming successful login
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
