const UserModel = require('../models/users.model');
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;
const { getUserId } = require('../middleware/auth.middleware');

module.exports.getAllUsers = async (req, res) => {
  try{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
  }
  catch (err) {
    return res.status(400).json('Impossible de récupérer les utilisateurs');
  }
}

module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send('ID unknown : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log('ID unknown : ' + err);
    }).select('-password');
};

module.exports.updateUser = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = getUserId(token);
  const {nom, prenom, bio, department} = req.body;
  const userPrev = req.body.user;

  if(bio === "" && nom === "" && prenom === "" && department === "") return res.status(400).json('Aucune champs a été rempli')

  try {
    await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          bio: bio ? bio : userPrev.bio,
          nom: nom ? nom : userPrev.nom,
          prenom: prenom ? prenom : userPrev.prenom,
          department: department ? department : userPrev.department,
        },
      },
      { upsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(400).json(err));
  } 
  catch (err) {
    return res.status(500).json(err);
  }
}

module.exports.deleteUser = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = getUserId(token);

  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send('ID unknown : ' + req.params.id) 

  await UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      if(userId == user._id) {
        UserModel.deleteOne({ _id: req.params.id })
        .then(() => {
          res.cookie('jwt', '', { maxAge: 1 });
          res.status(200).json('Compte supprimé avec success');
        })
        .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err));
}