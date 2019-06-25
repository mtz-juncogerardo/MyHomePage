const quote = require('./quotes.js');

module.exports = () =>{
  let randomQuote = Math.floor(Math.random() * (quote.length-1));
  let result = quote[randomQuote];
  return result;
};
