const mongoose= require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        picture: {
            type: String,
        },
        likers: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }],
            required: true,
        },
        comments: {
            type: [
                {
                    commenterId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    },
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', PostSchema)