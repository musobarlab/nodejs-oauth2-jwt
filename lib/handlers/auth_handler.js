'use strict';

let getToken = require('../utils/token_repository');
let User = require('../db/users');

function auth(req, res, next){
  if(!req.body){
    res.status(409).send('body not found');
  }
  let username = req.body.username;
  let password = req.body.password;
  User.findByUsername(username, user => {
    if(!user){
      res.status(404).send('username or password is not valid');
    }else if(!user.isValidPassword(password)){
      res.status(404).send('username or password is not valid');
    }else{
      let token = getToken(user.id, {});
      res.status(200).json({token : `JWT ${token}`});
    }
  });
}

module.exports = auth;
