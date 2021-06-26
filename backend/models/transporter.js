const mongoose = require('mongoose');
const { Schema } = mongoose;

const transporterSchema = new Schema(
    {
        transporterName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        transporterLogo: {
            type: String,
            required: true,
            unique: true,
        },
        contactNumber: {
            type: String,
        },
        policy: { type: String },
        transportFee: { type: Number },
        pickUpArea: { type: String, required: true },
        deliveryArea: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transporter', transporterSchema);
