const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: [ 'Buyer', 'Seller', 'Admin' ],
            default: 'Buyer'
        }, 
        registredDate: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model("User", userSchema);