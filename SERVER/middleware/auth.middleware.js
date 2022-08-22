const jwt = require('jsonwebtoken');
const UserModel = require('../models/users.model');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
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
      jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
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
          let jwtToken = jwt.verify(token, process.env.JWT_KEY);

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

module.exports.requireAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
      if (!err && decodedToken.isAdmin === true) {
        next()
      } else {        
        res.status(400).json('No access')
      }
    });
  } else {
        res.status(400).json('No access')
  }
};