'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function (){
  return new Promise((f, r) => {
    let file = path.join(__dirname, '../../secret/', 'app.rsa');
    fs.readFile(file, 'utf-8', (err, data) => {
      if(err){
        console.log(err);
        r(err);
      }
      f(data);
    });
  });
};
