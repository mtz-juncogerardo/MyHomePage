const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const motivation = require('motivation/lib/quotes');
//var m = motivation.get()
const googleTranslate = require('./config/googleTranslate.json');
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');
// Instantiates a client,
const translate = new Translate(googleTranslate.projectId);

app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{
  res.render('index',{
    googleFont: 'Lato'
  });
});

app.listen(process.env.PORT || 3000, ()=>{
  console.log("Servidor iniciado: Puerto 3000");
});
