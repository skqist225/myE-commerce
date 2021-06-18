const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contactNumber: {
        type: String,
        maxLength: [10, 'Your phone number can not exceed 10 characters'],
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        default: 'Viet Nam',
    },
    city: { type: String, required: true },
    county: { type: String, required: true },
    ward: { type: String, required: true },
    street: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    addressType: { type: String, required: true, enum: ['home', 'office'] },
});

module.exports = mongoose.model('Address', addressSchema);
