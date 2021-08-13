const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');

const reviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        productTypeId: {
            type: Schema.Types.ObjectId,
        },
        comment: { type: String },
        pictures: {
            type: [String],
            validate: [limitPictures, 'Can not upload more than 3 images'],
        },
        video: { type: String },
        rating: {
            type: Number,
            default: 0.0,
            min: 0,
            max: 5,
            required: true,
        },
        userLikes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                unique: [true, 'One user just like review one time'],
            },
        ],
        maskName: { type: Boolean, default: false },
    },
    { timestamps: true }
);

function limitPictures(val) {
    return val.length <= 3;
}

module.exports = mongoose.model('Review', reviewSchema);
