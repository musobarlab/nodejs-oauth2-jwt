'use strict';


class Client {
  constructor(clientId, clientSecret){
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  isValidClientSecret(clientSecret){
    return this.clientSecret === clientSecret;
  }
}

let clientDatas = [new Client('valid_client_id', '123456')];

function registerClient(client, cb){
  let c = new Client(client.clientId, client.clientSecret);
  clientDatas.push(c);
  cb(c);
}

function findByClientId(clientId, cb){
  let clientData = '';
  for(let i = 0; i < clientDatas.length ; i++){
    if(clientDatas[i].clientId === clientId){
      clientData = clientDatas[i];
      break;
    }
  }
  cb(clientData);
}

module.exports = {
  registerClient: registerClient,
  findByClientId: findByClientId
};
