const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        categoryImage: { type: String },
        parentId: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
