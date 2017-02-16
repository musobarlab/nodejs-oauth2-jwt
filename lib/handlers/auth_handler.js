'use strict';

let jwt = require('jsonwebtoken');
let config = require('../config/config');
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
      let secretKey = 'myDirtyLittleSecret';
      config.subject = user.id;
      let token = jwt.sign({}, secretKey, config);
      console.log(token);
      res.status(200).json({token : `JWT ${token}`});
    }
  });
}

module.exports = auth;
