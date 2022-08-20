const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/users.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { getUserId } = require('../middleware/auth.middleware');

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
    const picture = (req.file ? req.file.filename : null);
    const message = req.body.content;
    const userId = req.body.posterId;

   if(!message && !picture) return res.status(400).json('Publication vide')

    const newPost = new postModel({
        posterId: userId,
        message: message,
        picture: picture, 
        likers: [],
        comments: [],
    })

    try {
        const post = await newPost.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.updatePost = (req, res) => {
    const newContent = req.body.newContent;
    const picture = (req.file ? req.file.filename : null);

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    if(!newContent && !picture) return res.status(400).json('Publication vide');

    const updateRecord = {
        message: newContent,
        picture: picture
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { upsert: true },
        (err, docs) => {
            if (!err) res.status(200).json(docs);
            else res.status(400).json(err);
        }
    );
};

module.exports.deletePost = (req, res) => {
    const token = req.cookies.jwt;
    const userId = getUserId(token);

    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else res.status(400).json(err);
    });
};

module.exports.likePost = async (req, res) => {
    const token = req.cookies.jwt;
    const userId = getUserId(token);

    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    await PostModel.findByIdAndUpdate(
        req.params.id,
        {
            $addToSet: { likers: userId },
        },
        { new: true })
    .then((data) => {
        if(data) {
            UserModel.findByIdAndUpdate(
                userId,
                {
                  $addToSet: { likes: req.params.id },
                },
                { new: true })
                .then((data) => res.json(data))
                .catch((err) => res.status(500).json({ message: err }));
        }
    })
    .catch((err) => res.status(500).json({ message: err }));
}

module.exports.unlikePost = async (req, res) => {
    const token = req.cookies.jwt;
    const userId = getUserId(token);

    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
      await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likers: userId },
        },
        { new: true })
        .then((data) => {
        if(data) {
            UserModel.findByIdAndUpdate(
                userId,
                {
                    $pull: { likes: req.params.id },
                },
                { new: true })
                        .then((data) => res.json(data))
                        .catch((err) => res.status(500).json({ message: err }));
                }
        })
        .catch((err) => res.status(500).json({ message: err }));
};

module.exports.commentPost = (req, res) => {
    const token = req.cookies.jwt;
    const userId = getUserId(token);
    const commentContent = req.body.commentContent;

    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      if(!commentContent) return res.status(400).json('Commentaire vide');

        PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: userId,
                        text: commentContent,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.status(200).json(docs);
                else {
                    console.log(err);
                    res.status(400).json(err)
                };
            }
        )
};

module.exports.editCommentPost = (req, res) => {
    const token = req.cookies.jwt;
    const userId = getUserId(token);

    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    
    try {
        return PostModel.findById(
           req.params.id,
            (err, docs) => {
                const theComment = docs.comments.find((comment) => 
                 comment._id.equals(req.body.commentId)
                );

                if (!theComment) return res.status(404).send('Comment not found')
                theComment.text = req.body.newCommentContent;

                return docs.save((err) => {
                 if (!err) return res.status(200).json(docs);
                 return res.status(500).json(err);
                });
            });
    } catch (err) {
     return res.status(400).send(err);
    }
};

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    
    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
               $pull: {
                 comments: {
                    _id: req.body.commentId,
                 },
               }, 
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.status(200).json(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
      return res.status(400).send(err);
    }
};