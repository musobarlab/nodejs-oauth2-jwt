'use strict';

const User = require('../db/users');
const Client = require('../db/clients');
const uuid = require('uuid-v4');

function getProfileTest(req, res, next){
  let userId = req.userOrClientId;
  User.findById(userId, user => {
    res.status(200).json({user});
  });
}

function registeringClient(req, res, next){
  if(!req.body){
    res.status(409).send('body not found');
  } else{
    let username = req.body.username;
    let clientSecret = uuid();
    let client = {};
    client.clientId = username;
    client.clientSecret = clientSecret;
    Client.registerClient(client, result => {
      res.status(200).send(result);
    });
  }
}

function getClientTest(req, res, next){
  let clientId = req.userOrClientId;
  Client.findByClientId(clientId, client => {
    res.status(200).json({client});
  });
}

module.exports = {
  getProfileTest: getProfileTest,
  getClientTest: getClientTest,
  registeringClient: registeringClient
};
