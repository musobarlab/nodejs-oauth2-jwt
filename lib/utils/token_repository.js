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
  return {access_token : `JWT ${accessToken}`, refresh_token: refreshToken};
}

function getRefreshToken(oldAccessToken){

}

module.exports = {
  getToken: getToken,
  getRefreshToken: getRefreshToken
};
