const UserModel = require('../models/users.model');
const jwt = require('jsonwebtoken'); 
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_REGEX = /^(?=.*\d).{6,50}$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (id, isAdmin) => {
  return jwt.sign({id, isAdmin}, process.env.JWT_KEY, {
    expiresIn: maxAge
  })
}

module.exports.signUp = async (req, res, next) => {
  const {email, password, nom, prenom, dateNaissance, department} = req.body;

  if (
    !req.body.nom ||
    !req.body.prenom ||
    !req.body.dateNaissance ||
    !req.body.email ||
    !req.body.password ||
    !req.body.department
  ) {
    return res.status(400).json("Champs Invalides")
  }

  if(!EMAIL_REGEX.test(email)) {
    return res.status(400).json("Email n'est pas valide")
  }

  if(!PASSWORD_REGEX.test(password)) {
      return res.status(400).json("Password doit contenir 6 caractères minimum et un chiffre")
  }

  if(!DATE_REGEX.test(dateNaissance)) {
      return res.status(400).json("Date n'est pas valide")
  }

  await UserModel.findOne({email: email})
  .then((user) => {
    if(user) {
      res.status(400).json('Email a été dejà pris');
    }
    else {
      UserModel.create({email, password, nom, prenom, dateNaissance, department});
      res.status(200).json('Utilisateur a été bien crée');
    }
  })
  .catch((err) => res.status(400).json('Error pendant la création'));
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  
  if (email === null ||  password === null) {
    return res.status(400).json('Paramètres manquants');
  };

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id, user.isAdmin);
    res.cookie('jwt', token, { maxAge });
    res.status(200).json({ user: user._id})
  } catch (err) {
    res.status(400).json('Email ou password incorrrect');
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({'success': 'Logout'})
}