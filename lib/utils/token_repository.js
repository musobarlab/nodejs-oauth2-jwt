'use strict';

let jwt = require('jsonwebtoken');

module.exports = function(sub, payload){
  let secretKey = 'myDirtyLittleSecret';
  let config = {
    //algorithm: 'RS256',
    expiresIn: 60,
    audience: 'wury.co.id',
    issuer: 'api.wury.auth.com',
    subject: sub
  };
  let token = jwt.sign(payload, secretKey, config);
  return token;
}
