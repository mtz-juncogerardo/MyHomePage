const request = require('request');
const key = require('../config/keys.js');

let url = `http://api.apixu.com/v1/current.json?key=${key.weatherKey}&q=Paris`;

let getData = (options) => {

  return new Promise((resolve,reject)=>{

    request(url, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      resolve(body);
  });

  });
};

module.exports = getData({url, json: true});
