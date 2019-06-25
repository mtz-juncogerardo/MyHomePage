const quote = require('../misc/quoteGenerator');
const getLink = require('../misc/fontMaker');

let font = {
  fontLink: 'Lato',
  googleFont: 'Lato'
};

module.exports = (app) => {
  app.get('/', (req, res) => {

    res.render('index', {
      googleFont: font.googleFont,
      fontLink: font.fontLink,
      frase: quote().text,
      autor: quote().author,
      nombre: 'Gerardo'
    });
  });

  app.post("/", (req, res) => {
    font = {
      fontLink: getLink(req.body.font),
      googleFont: req.body.font
    };
    res.redirect('back');
  });
};
