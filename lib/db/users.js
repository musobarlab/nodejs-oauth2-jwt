'use strict';

const userDatas = [
  {'id': 'USR01', 'username': 'wuriyanto', 'password': '12345', 'displayName': 'Wuriyanto Musobar'},
  {'id': 'USR02', 'username': 'walker', 'password': '12345', 'displayName': 'Walker Ahmad'}
];

class User {
  constructor(id, username, password, displayName){
    this.id = id;
    this.username = username;
    this.password = password;
    this.displayName = displayName;
  }

  isValidPassword(password){
    return this.password === password;
  }
}

function findByUsername(username, cb){
  let userData = '';
  for(let i = 0 ; i < userDatas.length ; i++){
    if(userDatas[i].username === username){
      userData = userDatas[i];
      break;
    }

  }
  let user =  new User(userData.id, userData.username, userData.password, userData.displayName);
  cb(user);
}

function findById(id, cb){
  let userData = '';
  for(let i=0;i<userDatas.length;i++){
    if(userDatas[i].id === id){
      userData = userDatas[i];
      break;
    }

  }
  let user =  new User(userData.id, userData.username, userData.password, userData.displayName);
  cb(user);
};

module.exports = {
  findById: findById,
  findByUsername: findByUsername
};
