'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function (){
  return new Promise((f, r) => {
    let file = path.join(__dirname, '../../secret/', 'app.rsa.pub');
    fs.readFile(file, 'utf-8', (err, data) => {
      if(err){
        r(err);
      }
      f(data);
    });
  });
};
