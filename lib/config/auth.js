'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../db/users');

let opts = {};
opts.issuer = 'api.wury.auth.com',
opts.audience = 'wury.co.id',
opts.secretOrKey = 'myDirtyLittleSecret';
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

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
