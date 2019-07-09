const quote = require("../misc/quoteGenerator");
const getLink = require("../misc/fontMaker");
const getWeather = require("../misc/weather");
const weatherIcon = require("../misc/weatherIcons");
const mongoose = require('mongoose');



module.exports = app => {
  

  let userSettings = mongoose.model("settings");
  require('./login')(app);

  app.get("/home",(req, res) => {
    //Get phrase
    let phrase = quote();
    //Get Weather
    getWeather.then(body => {
      let weather = JSON.parse(body);
      let code = weather.current.condition.code;
      //Get icon
      let codeObject = weatherIcon.filter(item => item.code === code);
      
      //get settings from DB
      userSettings.findOne({'email': "mtz.juncogerardo@gmail.com"}, 'googleFont fontLink name', (err, person)=>{

        res.render("index", {
          googleFont: person.googleFont,
          fontLink: getLink(person.fontLink),
          frase: phrase.text,
          autor: phrase.author,
          temp: weather.current.temp_c,
          grados: "C",
          nombre: person.name,
          weatherCode: codeObject[0].icon
        });


      });
    });
  });

};
