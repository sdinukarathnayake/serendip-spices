const Order = require('../modules/orderModel');

const createOrder = async (req, res) => {

    try {
        const {
            orderId,
            userId,
            items,
            subTotal,
            deliveryFee,
            orderTotal,
            orderStatus,       // Optional, default is 'Processing'
            paymentStatus      // Optional, default is 'Pending'
        } = req.body;

        if (!orderId || !userId || !items || !subTotal || !deliveryFee || !orderTotal || !orderStatus || !paymentStatus) {
            return res.status(400).json({ message: "Missing required fields." });
        };

        const newOrder = new Order({ orderId,userId,items,subTotal,deliveryFee,orderTotal,orderStatus, paymentStatus});
        await newOrder.save();

        res.status(201).json({ message: "New order created successfully", Order: newOrder });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create order", error: err.message });
    }
};

const viewAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

const viewOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ orderId });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    }

    catch (err) {
        res.status(400).json({
            message: "Invalid order ID",
            error: err.message
        });
        res.status
    }
};

const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const {userId,items,subTotal,deliveryFee,orderTotal,orderStatus, paymentStatus } = req.body;

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        };

        const updateOrder = await Order.findOneAndUpdate(
            { orderId }, { orderId,userId,items,subTotal,deliveryFee,orderTotal,orderStatus, paymentStatus}, { new: true }
        );

        res.status(200).json({ message: "Order updated successfully", Order: updateOrder });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update order", error: err.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOneAndDelete({ orderId });
        res.status(200).json({ message: "Order deleted successfully", Order: order });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete order", error: err.message });
    }
};

module.exports = { createOrder, viewAllOrders, viewOrder, updateOrder, deleteOrder };