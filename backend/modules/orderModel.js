const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: String,
            required: true
        },

        items: [
            {
                productId: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                itemTotal: {
                    type: Number,
                    required: true
                }
            }
        ],

        subTotal: {
            type: Number,
            required: true
        },

        deliveryFee: {
            type: Number,
            required: true
        },

        orderTotal: {
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
        },

        paymentStatus: {
            type: String,
            required: true,
            enum: ['Pending', 'Paid', 'Cancelled'],
            default: 'Pending'
        }
    }
);

module.exports = mongoose.model("Order", orderSchema)