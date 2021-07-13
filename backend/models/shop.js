const mongoose = require('mongoose');
const { Schema } = mongoose;

const shopSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        shopName: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        shopLogo: {
            type: String,
            required: true,
        },
        shopDescription: {
            type: String,
            required: [true, 'Shop description is required'],
            maxLength: [100, 'Shop description can not exceeded 100 characters'],
        },
        homeImages: [{ type: String }],
        number_of_followers: {
            type: Number,
            required: true,
            default: 0,
            max: 100000,
        },
        vouchers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Voucher',
            },
        ],
        isApproved: {
            type: Boolean,
            default: false,
        },
        shopLocation: { type: String },
        isMallType: { type: Boolean, default: false },
        shopCategory: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
        approvedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

function limitArray(val) {
    return val.length < 3000;
}

module.exports = mongoose.model('Shop', shopSchema);
