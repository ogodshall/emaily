const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// Connects us to the externally hosted MongoDB database
mongoose.connect(keys.mongoURI);

// Generates an Express server
const app = express();

// Middleware
// bodyParser:
// Parses request data and puts it into res.body
app.use(bodyParser.json());
// cookieSession:
// Configures the cookie that will be used for login
// maxAge is the amount of time in milliseconds that a cookie lasts
// keys is the encryption key used to generate the user's ID
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// passport:
// Assists in user authentication
app.use(passport.initialize());
app.use(passport.session());

// Calls the various routes, passing them "app" as an argument
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Activates the Express server, using Heroku or localhost
const PORT = process.env.PORT || 5000;
app.listen(PORT);
