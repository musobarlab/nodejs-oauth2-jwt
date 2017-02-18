'use strict';

let jwt = require('jsonwebtoken');

function getToken(headers) {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
}

function verifyToken(req, res, next){
  let token = getToken(req.headers)
  if (!token) {
   res.status(401).send('No token provided.');
 } else{
   let secretKey = 'myDirtyLittleSecret';
   let config = {
     audience: 'wury.co.id',
     issuer: 'api.wury.auth.com'
   };
   jwt.verify(token, secretKey, config, (err, decoded) => {
     if (err) {
      if(err.name === 'TokenExpiredError'){
        res.status(401).send('Access token expired');
      } else {
        res.status(401).send('Token is not valid');
      }
    } else {
      let id = decoded.sub;
      req.userOrClientId = id;
      next();
    }
   });
 }
}

module.exports = {
  verifyToken: verifyToken
};
