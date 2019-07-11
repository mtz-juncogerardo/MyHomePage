const request = require('request');
const key = require('../config/keys.js');

let getData = (url) => {

  return new Promise((resolve,reject)=>{

    request(url, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      resolve(body);
  });

  });
};

module.exports = app =>{
  app.post('/weather',(req,res)=>{

    let coords = req.body;
    console.log(coords);
    let url = `http://api.apixu.com/v1/current.json?key=${key.weatherKey}&q=${coords.lat},${coords.long}`;
  
    getData(url).then(data => res.json(data));
  
  });
  
}






