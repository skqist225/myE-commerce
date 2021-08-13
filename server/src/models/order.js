const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
        shippingInfo: {
            type: [
                {
                    shippingDescription: {
                        type: String,
                        maxLength: 100,
                        trim: true,
                        default: 'Product is being processed',
                        required: true,
                    },
                    at: { type: Date, default: Date.now, required: true },
                },
            ],
            required: true,
        },
        deliveryAddress: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        products: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                productTypeId: { type: Schema.Types.ObjectId },
                quantity: { type: Number, required: true },
            },
        ],
        transporter: {
            type: Schema.Types.ObjectId,
            ref: 'Product.transporters',
        },
        modeOfPayment: { type: String, required: true, enum: ['cod', 'card', 'shopeeWallet'] },
        orderStatus: {
            type: String,
            enum: ['confirming', 'packing', 'shipping', 'delivered', 'cancelled', 'refund'],
            default: 'confirming',
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', orderSchema);
