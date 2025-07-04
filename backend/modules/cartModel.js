const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        cartId: {
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
                total: {
                    type: Number,
                    required: true
                }
            }
        ],

        cartTotal: {
            type: Number,
            required: true
        }
    }
);

module.exports = mongoose.model("Cart", cartSchema);