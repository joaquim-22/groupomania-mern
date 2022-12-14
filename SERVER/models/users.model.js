const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const PostModel = require('./post.model');

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      maxLength: 55,
    },
    prenom: {
      type: String,
      required: true,
      maxLength: 55,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    department: {
      type: String,
      maxLength: 55,
      trim: true
    },
    dateNaissance: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      default: "random-user.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
    }
  },
  {
    timestamps: true,
  }
);

// play function before save,
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('deleteOne', { document: false, query: true }, async function() {
  const doc = await this.model.findOne(this.getFilter());
  await PostModel.deleteMany({ posterId: doc._id });
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;