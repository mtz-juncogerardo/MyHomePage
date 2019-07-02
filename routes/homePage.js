const quote = require('../misc/quoteGenerator');
const getLink = require('../misc/fontMaker');
const getWeather = require('../misc/weather');
const request = require('request');
const key = require('../config/keys.js');
const weatherIcon = require('../misc/weatherIcons');

let font = {
  fontLink: 'Lato',
  googleFont: 'Lato'
};


module.exports = (app) => {
  app.get('/', (req, res) => {
    //Get phrase
    let phrase = quote();
    //Get Weather
    getWeather.then(body => {
      let weather = JSON.parse(body);
      let code = weather.current.condition.code;
      let codeObject = weatherIcon.filter(item => item.code === code); 
      //Get icon

      res.render('index', {
        googleFont: font.googleFont,
        fontLink: font.fontLink,
        frase: phrase.text,
        autor: phrase.author,
        temp: weather.current.temp_c,
        grados: "C",
        nombre: 'Gerardo',
        weatherCode: codeObject[0].icon
      });
    })
  });


  app.post('/', (req, res) => {
    font = {
      fontLink: getLink(req.body.font),
      googleFont: req.body.font
    };
    res.redirect('back');
  });

  app.post('/todo', (req, res) => {
    let todoItem = req.body.todo;
    res.send(todoItem);
  });



};
