const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        deliveryAddressLine1: {
            type: String,
            required: true
        },
        deliveryAddressLine2: {
            type: String,
            required: true
        },
        deliveryCity: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("Delivery", deliverySchema);