const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// Connects us to the externally hosted MongoDB
mongoose.connect(keys.mongoURI);

// Generates an Express server
const app = express();

// Configures the cookie that will be used for login
// maxAge is the amount of time a cookie lasts before being auto-wiped
// It's expressed in milliseconds, hence the math
// keys is the encryption key used to generate the user's ID
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Calls the authRoutes function, passing it "app" as an argument
require('./routes/authRoutes')(app);

// Activates the Express server, using Heroku or localhost
const PORT = process.env.PORT || 5000;
app.listen(PORT);
