const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const key = require('./config/keys.js');

require('./models/settings');



mongoose.connect(key.mongoConnection, { useNewUrlParser: true });


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Routes
require('./routes/homePage')(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor iniciado: Puerto 3000");
});

