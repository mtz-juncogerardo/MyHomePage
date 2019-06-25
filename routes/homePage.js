const quote = require('../misc/quoteGenerator');
const getLink = require('../misc/fontMaker');

let font = {
  fontLink: 'Lato',
  googleFont: 'Lato'
};

module.exports = (app) => {
  app.get('/', (req, res) => {

    let phrase = quote();

    res.render('index', {
      googleFont: font.googleFont,
      fontLink: font.fontLink,
      frase: phrase.text,
      autor: phrase.author,
      nombre: 'Gerardo'
    });
  });

  app.post('/', (req, res) => {
    font = {
      fontLink: getLink(req.body.font),
      googleFont: req.body.font
    };
    res.redirect('back');
  });

  app.post('/todo',(req,res)=>{
    let todoItem = req.body.todo;
    res.send(todoItem);
  });


};
