'use strict';

function getProfile(req, res, next){
  let user = req.user;
  res.status(200).json({user: user});
}

module.exports = {
  getProfile: getProfile
};
