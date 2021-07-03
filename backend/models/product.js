const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
        productName: {
            type: String,
            maxLength: [100, 'Product name cannot exceed 100 characters'],
            required: [true, 'Please enter product name'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please enter product description'],
            trim: true,
        },
        images: [{ type: String, required: true }],
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Please select category for this product'],
        },
        supplier: {
            type: Schema.Types.ObjectId,
            ref: 'Supplier',
            // required: [
            //     true,
            //     'Please select supplier or creating a new supplier for this product',
            // ],
        },
        transporters: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Transporter',
                    required: [true, 'Please select transporter for this product'],
                },
            ],
            validate: [limitTransporter, '${PATH} can not exceed 3 transporters'],
            required: [true, 'Please choose transporter for this product'],
        },
        productTypes: {
            type: [
                {
                    typeName: { type: String, required: true },
                    typeImage: { type: String, required: true },
                    typeStock: { type: Number, required: true },
                    typePrice: { type: Number, required: true },
                },
            ],
            required: [true, 'Please fill in full product information'],
            validate: [limitArray, '${PATH} can not exceed 20 products'],
        },
        isFreeship: { type: Boolean, default: false },
        discountPercent: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        productWeight: {
            type: Number,
            required: [true, 'Please enter product weight'],
            select: false,
        },
        soldNumber: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

function limitArray(val) {
    return val.length <= 20;
}

function limitTransporter(val) {
    return val.length <= 3;
}

module.exports = mongoose.model('Product', productSchema);
