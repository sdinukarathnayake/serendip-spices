const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema(
    {
        
    }
);

module.exports = mongoose.model("Delivery", deliverySchema);