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
        password: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['Buyer', 'Seller', 'Admin'],
            default: 'Buyer'
        },
        phone: {
            type: String,
            required: true
        },
        
         profilePicture: {
            type: String,
            required: true,
        },
         registredDate: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model("User", userSchema);