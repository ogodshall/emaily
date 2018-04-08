const mongoose = require('mongoose');
const { Schema } = mongoose;
// this is ES6 destructuring, equivalent to const Schema = mongoos.Schema;

// creates the model for our User, specifying the type of each variable
// googleId: identifier
// credits: number of unused survey credits
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
