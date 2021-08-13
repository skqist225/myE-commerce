const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierSchema = new Schema({
    supplierName: {
        type: String,
        required: true,
        maxLength: [50, 'Supplier name can not exceed 50 characters'],
        unique: true,
    },
    supplierLogo: {
        type: String,
        required: true,
    },
    headquarterAddress: {
        type: String,
        required: true,
        maxLength: 100,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    webURL: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Supplier', supplierSchema);
