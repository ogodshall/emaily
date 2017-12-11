const mongoose = require('mongoose');
const { Schema } = mongoose;
// this is ES6 destructuring, equivalent to const Schema = mongoos.Schema;

// creates the model for our User, specifying the type of each variable
const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
