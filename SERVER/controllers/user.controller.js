const UserModel = require('../models/users.model');
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;
const { getUserId } = require('../middleware/auth.middleware');

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', 5);
  res.status(200).json(users);
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
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id) 

    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ message: "Succefully deleted. "});
    } 
    catch (err) {
      return res.status(500).json({ message: err});
    }
}