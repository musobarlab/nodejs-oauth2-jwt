'use strict';

const jwt = require('jsonwebtoken');
const uuid = require('uuid-v4');
const getPrivateKey = require('./fetch_private_key');

let oldStoredTokens = [];

function getClientToken(sub, secret, payload){
  let config = {
    algorithm: 'RS256',
    expiresIn: 60,
    audience: 'wury.co.id',
    issuer: 'api.wury.auth.com',
    subject: sub
  };
  let accessToken = jwt.sign(payload, secret, config);
  return {access_token: `Bearer ${accessToken}`, token_type: 'bearer'};
}

function getToken(sub, secret, payload){
  let config = {
    algorithm: 'RS256',
    expiresIn: 60,
    audience: 'wury.co.id',
    issuer: 'api.wury.auth.com',
    subject: sub
  };
  let accessToken = jwt.sign(payload, secret, config);
  let refreshToken = uuid();

  let tokenStore = {accessToken: accessToken, refreshToken: refreshToken};
  oldStoredTokens.push(tokenStore);
  return {access_token : `Bearer ${accessToken}`, token_type: 'bearer', refresh_token: refreshToken};
}

function getRefreshToken(refreshToken, publicKey, cb){
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
  jwt.verify(token.accessToken, publicKey, config, (err, decoded) => {
    if(err){
      cb(err, null);
    }else{
      let userId = decoded.sub;
      getPrivateKey().then(privateKey => {
        cb(null, getToken(userId, privateKey, {}));
      }).catch(err => {
        cb(err, null);
      });
    }
  });
}

module.exports = {
  getClientToken: getClientToken,
  getToken: getToken,
  getRefreshToken: getRefreshToken
};
