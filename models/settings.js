const mongoose = require('mongoose');
const {Schema} = mongoose;

const settingsSchema = new Schema({
  email: String,
  password: String,
  googleFont: String,
  fontLink: String,
  apodo: String,
  colorCode: String,
});

mongoose.model('settings', settingsSchema);
