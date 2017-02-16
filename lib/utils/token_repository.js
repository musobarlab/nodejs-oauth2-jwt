'use strict';

let jwt = require('jsonwebtoken');
let uuid = require('uuid-v4');

let oldStoredTokens = [];

function getToken(sub, payload){
  let secretKey = 'myDirtyLittleSecret';
  let config = {
    //algorithm: 'RS256',
    expiresIn: 60,
    audience: 'wury.co.id',
    issuer: 'api.wury.auth.com',
    subject: sub
  };
  let accessToken = jwt.sign(payload, secretKey, config);
  let refreshToken = uuid();

  let tokenStore = {accessToken: accessToken, refreshToken: refreshToken};
  oldStoredTokens.push(tokenStore);
  return {access_token : `JWT ${accessToken}`, refresh_token: refreshToken};
}

function getRefreshToken(refreshToken, cb){
  let secretKey = 'myDirtyLittleSecret';
  let config = {
    audience: 'wury.co.id',
    issuer: 'api.wury.auth.com',
    ignoreExpiration: true
  };

  let token = '';
  for(let i=0;i < oldStoredTokens.length;i++){
    if(oldStoredTokens[i].refreshToken === refreshToken){
      token = oldStoredTokens[i];
      break;
    }
  }
  jwt.verify(token.accessToken, secretKey, config, (err, decoded) => {
    if(err){
      cb(err, null);
    }else{
      let userId = decoded.sub;
      cb(null, getToken(userId, {}));
    }
  });
}

module.exports = {
  getToken: getToken,
  getRefreshToken: getRefreshToken
};
