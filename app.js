const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const getLink = require('./misc/fontMaker');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const getQuote = require("./misc/quoteGenerator");

app.use(express.json());
app.use(cookieParser());

require('./models/settings');
let userSettings = mongoose.model("settings");

mongoose.connect(process.env.mongoConnection, { useNewUrlParser: true });

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Routes
require('./routes/login')(app);
require('./routes/weather')(app);

app.get('/', (req,res)=>{

jwt.verify(req.cookies.jwtToken, process.env.jsonSecret, (err, decoded)=>{

  if(decoded){
    res.redirect('/homePage');
  }
  else{
    res.redirect('/login');
  }
  
});

});

app.post('/settings', (req,res)=>{

    let settings = {
      colorCode: req.body.colorCode,
      fontName: req.body.fontName,
      apodo: req.body.apodo
    };

    jwt.verify(req.cookies.jwtToken, process.env.jsonSecret, (err, decoded)=>{

      userSettings.findOne({ email: decoded.email}, (err, person) => {

        if(req.body.colorCode){
          person.colorCode = settings.colorCode;
        }
        if(req.body.fontName){
          person.fontLink = getLink(settings.fontName);
          person.googleFont = settings.fontName;
        }
        if(req.body.apodo){
          person.apodo = settings.apodo;
        }
  
        person.save();
  
        res.redirect('homePage');
      });

    })
    
});

app.post('/home', (req,res)=>{
  jwt.verify(req.cookies.jwtToken, process.env.jsonSecret, (err, decoded)=>{
    //Ya decodificada la clave procedemos a buscar el usuario en BD
    if(err){
      res.sendStatus(403);
    }else{
      userSettings.findOne({email: decoded.email}, 'email googleFont fontLink apodo colorCode', (err, person)=>{
        res.json(person);
      });
    }
  });

});

app.get('/homePage', (req,res)=>{

  jwt.verify(req.cookies.jwtToken, process.env.jsonSecret, (err, decoded)=>{

    if(decoded){
      userSettings.findOne({ email: decoded.email}, (err, person)=>{

        let quote = getQuote();

        res.render('index',{
          fontLink: person.fontLink,
          googleFont: person.googleFont,
          frase: quote.text,
          autor: quote.author
        });

      });
      
    }
    else{
      res.redirect('/login');
    }
  });
});

app.post('/logout',(req,res)=>{

res.clearCookie('jwtToken');
res.redirect('/login');

});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor iniciado: Puerto 3000");
});

