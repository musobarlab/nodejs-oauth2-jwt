'use strict';

let jwt = require('jsonwebtoken');
let config = require('../config/config');

module.exports = function(subject, payload){
  let secretKey = 'myDirtyLittleSecret';
  config.subject = subject;
  let token = jwt.sign(payload, secretKey, config);
  return token;
}
