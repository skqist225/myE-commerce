const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        cartProducts: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                productTypeId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Cart', cartSchema);
