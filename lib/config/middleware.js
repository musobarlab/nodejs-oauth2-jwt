'use strict';

const jwt = require('jsonwebtoken');
const getPublicKey = require('../utils/fetch_public_key');

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
   let config = {
     audience: 'wury.co.id',
     issuer: 'api.wury.auth.com'
   };
   getPublicKey().then(publicKey => {
     jwt.verify(token, publicKey, config, (err, decoded) => {
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
   }).catch(err => {
     res.status(500).send('Error occurred');
   });
 }
}

module.exports = {
  verifyToken: verifyToken
};
