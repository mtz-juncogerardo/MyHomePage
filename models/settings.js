const mongoose = require('mongoose');
const {Schema} = mongoose;

const settingsSchema = new Schema({
  googleFont: String,
  fontLink: String,
  name: String,
  bgImage: String,
  color: String,
  clock24: Boolean,
});

mongoose.model('settings', settingsSchema);
