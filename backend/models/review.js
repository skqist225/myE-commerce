const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
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
    comment: { type: String, required: true },
    pictures: [{ type: String }],
    rating: {
        type: Number,
        default: 0.0,
        min: 0,
        max: 5,
        required: true,
    },
    rateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
