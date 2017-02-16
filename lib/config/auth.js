'use strict';

let passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('../db/users');
let config = require('./config');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'myDirtyLittleSecret';
opts.issuer = config.issuer;
opts.audience = config.audience;

passport.use(new JwtStrategy(opts, verify));

function verify(jwt_payload, done){
  User.findById(jwt_payload.sub, user => {
    if(!user){
      return done(null, false);
    }else{
      return done(null, user);
    }
  });
}

let isAuthenticated = passport.authenticate('jwt', {session: false});
let init = () => passport.initialize();

module.exports = {
  isAuthenticated: isAuthenticated,
  init: init
}
