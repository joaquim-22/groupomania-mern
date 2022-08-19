const UserModel = require('../models/users.model');
const { getUserId } = require('../middleware/auth.middleware');

module.exports.uploadProfil = async (req, res) => {
    const token = req.cookies.jwt;
    const userId = getUserId(token);
    const picture = req.file.filename;

    try {
        await UserModel.findByIdAndUpdate(
          userId,
            { $set: { picture: picture } },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
            
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err });
      }
};