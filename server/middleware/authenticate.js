var {User} = require('./../models/user');
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      // when this will be fired ...
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {

    // ... and this will be fired
    res.status(401).send();
  });
};

module.exports = {authenticate};
