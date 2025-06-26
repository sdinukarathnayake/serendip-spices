const mongoose = require ('mongoose');
const orderSchema = new mongoose.Schema(
{
    orderId:{
        type: String,
        required: true,
        unique: true
    },
     productId:{
            type:String,
            required:true,
            unique:true
        },
     sellerId:{
            type:String,
            required:true,
            unique:true
        },
        buyerId:{
                type:String,
                required:true,
                unique:true
            },
        soldPrice:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        total:{
            type:Number,
            required:true
        },
        deliveryAddressLine1:{
            type:String,
            required:true
        },
        deliveryAddressLine2:{
            type:String,
            required:true
        },
        deliveryCity:{
            type:String,
            required:true
        },
        contactNumber:{
            type:String,
            required:true
        },
        orderDate:{
            type:Date,
            default: Date.now
        },
        orderTime:{
            type:String,
            required:true
        },
        orderStatus:{
            type:String,
            required:true,
            enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending'
        }
}
);

module.exports = mongoose.model("order",orderSchema)