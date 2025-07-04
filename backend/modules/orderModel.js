const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },
        productId: {
            type: String,
            required: true
        },
        sellerId: {
            type: String,
            required: true
        },
        buyerId: {
            type: String,
            required: true
        },
        soldPrice: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
       
        orderDate: {
            type: Date,
            default: Date.now
        },
        orderStatus: {
            type: String,
            required: true,
            enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Processing'
        }
    }
);

module.exports = mongoose.model("Order", orderSchema)