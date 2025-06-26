const Order = require('../modules/orderModel');

const createOrder = async(req,res) =>{

    try{
        const{orderId, productId, sellerId, buyerId, soldPrice, quantity, total, deliveryAddressLine1, deliveryAddressLine2, deliveryCity, contactNumber, orderDate, orderTime, orderStatus} = req.body;

        if(!orderId || !productId || !sellerId || !buyerId || !soldPrice || !quantity || !total || !deliveryAddressLine1 || !deliveryAddressLine2 || !deliveryCity || !contactNumber || !orderTime || !orderStatus){
            return res.status(400).json({message: "Missing required fields."});
        };

        const newOrder = new Order({orderId, productId, sellerId, buyerId, soldPrice, quantity, total, deliveryAddressLine1, deliveryAddressLine2, deliveryCity, contactNumber, orderDate, orderTime, orderStatus});
    await newOrder.save();
    res.status(201).json({message: "New order created successfully", Order: newOrder});
    }
    catch(err){
        res.status(500).json({message:"Failed to create order", error: err.message});
    }
};

const viewAllOrders = async (req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json({message: "Failed to fetch orders"});
    }
};

const viewOrder = async(req, res) => {
    try{
        const {orderId} = req.params;
        const order = await Order.findOne({orderId});

        if(!order) return res.status(404).json({message : "Order not found"});
   res.status(200).json(order);
    }

    catch(err){
        res.status(400).json({message: "Invalid order ID",
             error: err.message});
        res.status
    }
};

const updateOrder = async(req,res) =>{
    try{
        const {orderId} =req.params;
        const { productId, sellerId, buyerId, soldPrice, quantity, total, deliveryAddressLine1, deliveryAddressLine2, deliveryCity, contactNumber, orderDate, orderTime, orderStatus} = req.body;
    
        const order = await Order.findOne({orderId});

        if(!order){
            return res.status(404).json({message: "Order not found"});
        };

        const updateOrder = await Order.findOneAndUpdate(
            {orderId},{orderId, productId, sellerId, buyerId, soldPrice, quantity, total, deliveryAddressLine1, deliveryAddressLine2, deliveryCity, contactNumber, orderDate, orderTime, orderStatus}, {new: true}
        );

        res.status(200).json({message: "Order updated successfully", Order: updateOrder});
    }
    catch(err){
        res.status(500).json({message: "Failed to update order", error: err.message});
    }
    };

    const deleteOrder = async(req,res) =>{
        try{
            const {orderId} = req.params;
const order = await Order.findOne({orderId});
res.status(200).json ({message : "Order deleted successfully", Order: order});
        }
        catch(err){
            res.status(500).json({message: "Failed to delete order", error: err.message});
        }
    };

    module.exports = {createOrder, viewAllOrders, viewOrder, updateOrder, deleteOrder};