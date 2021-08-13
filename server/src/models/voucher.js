const mongoose = require('mongoose');
const { Schema } = mongoose;

const voucherSchema = new Schema({
    discountPrice: { type: Number },
    onWhatPriceOfProduct: { type: Number },
    voucherImage: { type: String },
    end: { type: Date, required: true },
    start: { type: Date },
    amount: { type: Number, required: true },
    voucherDescription: { type: String, required: true },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    isFreeshipVoucher: { type: Boolean, default: false },
});

module.exports = mongoose.model('Voucher', voucherSchema);
