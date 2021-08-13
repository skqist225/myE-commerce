const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes_nbm: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            commenter: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            cmtContent: {
                type: String,
                required: true,
                maxLength: [200, 'Comment can not exceed 100 characters'],
            },
        },
    ],
});

module.exports = mongoose.model(Post, postSchema);
