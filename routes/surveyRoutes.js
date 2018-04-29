const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  // asdsa
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  // POST handler to create a new survey
  // Middleware included to confirm login and sufficient credits first
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // strips the survey properties off of the incoming request
    const { title, subject, body, recipients } = req.body;

    // creates a new Survey instance, populated with the incoming values
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // creates a new Mailer by combining the Survey info with an email template
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      // Sends the mailer out to sendgrid
      await mailer.send();
      // Saves our survey into the database
      await survey.save();
      // Deducts one credit from the user account, updates the user's info
      // Then we save the updated user to the database
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
