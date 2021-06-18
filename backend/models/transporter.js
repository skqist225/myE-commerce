const mongoose = require('mongoose');
const { Schema } = mongoose;

const transporterSchema = new Schema(
    {
        transporterName: {
            type: String,
            required: true,
            trim: true,
        },
        transporterlogo: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        policy: { type: String },
        transportFee: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transporter', transporterSchema);
