'use strict';

let jwt = require('jsonwebtoken');
let basicAuth = require('basic-auth');
let tokenRepo = require('../utils/token_repository');
let User = require('../db/users');
let Client = require('../db/clients');

function auth(req, res, next){
  if(!req.body){
    res.status(409).send('body not found');
  }
  if(!req.query){
    res.status(409).send('query params not found');
  }
  let grantType = req.query.grant_type;
  if(grantType === 'client_credentials'){
    let clientAuth = basicAuth(req);
    console.log(clientAuth.name+' : '+clientAuth.pass);
    let clientId = clientAuth.name;
    let clientSecret = clientAuth.pass;
    Client.findByClientId(clientId, client => {
      if(!client){
        res.status(401).send('username or password is not valid');
      }else if(!client.isValidClientSecret(clientSecret)){
        res.status(401).send('username or password is not valid');
      }else{
        let token = tokenRepo.getClientToken(client.clientId, {});
        res.status(200).json({token});
      }
    });
  } else if(grantType === 'password'){
    let username = req.body.username;
    let password = req.body.password;
    User.findByUsername(username, user => {
      if(!user){
        res.status(401).send('username or password is not valid');
      }else if(!user.isValidPassword(password)){
        res.status(401).send('username or password is not valid');
      }else{
        let token = tokenRepo.getToken(user.id, {userId: user.id, username: user.username});
        res.status(200).json({token});
      }
    });
  } else if(grantType === 'refresh_token'){
    let refreshToken = req.body.refresh_token;
    tokenRepo.getRefreshToken(refreshToken, (err, newToken) => {
      res.status(200).json({newToken});
    });
  } else{
    res.status(401).send('grant type is not valid');
  }
}

module.exports = auth;
