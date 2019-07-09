const mongoose = require('mongoose');
const {Schema} = mongoose;

const settingsSchema = new Schema({
  email: String,
  password: String,
  googleFont: String,
  fontLink: String,
  name: String,
  bgImage: String,
  color: String,
  clock24: Boolean,
});

mongoose.model('settings', settingsSchema);
