const jwt = require('jsonwebtoken');
const UserModel = require('../models/users.model');
const JWT_SIGN_SECRET = '<JWT_SIGN_TOKEN>';

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SIGN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
              console.log(decodedToken);
              let user = await UserModel.findById(decodedToken.id);
              res.locals.user = user;
              next();
            }
        })  
    } else {
        res.locals.user = null;
        next()
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, JWT_SIGN_SECRET, async (err, decodedToken) => {
        if (err) {
          res.status(400).json('No token')
        } else {
          next();
        }
      });
    } else {
          res.status(400).json('No token')
    }
  };

module.exports.getUserId = (token) => {
  let userId = -1; //Default value for security

  if (token !== null) {
      try {
          let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);

          if (jwtToken != null) {
              userId = jwtToken.id;
          }
      }
      catch (err) {
          console.log(err)
      }
  }   
  return userId;
};