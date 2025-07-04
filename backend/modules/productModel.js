const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true
        },
        productName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        pricePerKg: {
            type: Number,
            required: true
        },
        userId: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("Product", productSchema);