const Order = require('../modules/orderModel');

// Create a new order
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

        // Basic validation
        if (!orderId || !userId || !Array.isArray(items) || items.length === 0 || subTotal == null || deliveryFee == null || orderTotal == null) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Validate each item
        for (let item of items) {
            if (!item.productId || item.quantity == null || item.itemTotal == null) {
                return res.status(400).json({ message: "Each item must have productId, quantity, and itemTotal." });
            }
        }

        const newOrder = new Order({
            orderId,
            userId,
            items,
            subTotal,
            deliveryFee,
            orderTotal,
            orderStatus,    // Optional - will default
            paymentStatus   // Optional - will default
        });

        await newOrder.save();
        res.status(201).json({ message: "New order created successfully", order: newOrder });

    } catch (err) {
        res.status(500).json({ message: "Failed to create order", error: err.message });
    }
};

// View all orders
const viewAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders", error: err.message });
    }
};

// View a specific order
const viewOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ orderId });

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ message: "Invalid order ID", error: err.message });
    }
};

// Update an existing order
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const {
            userId,
            items,
            subTotal,
            deliveryFee,
            orderTotal,
            orderStatus,
            paymentStatus
        } = req.body;

        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const updateData = {
            userId,
            items,
            subTotal,
            deliveryFee,
            orderTotal,
            orderStatus,
            paymentStatus
        };

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            updateData,
            { new: true }
        );

        res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (err) {
        res.status(500).json({ message: "Failed to update order", error: err.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await Order.findOneAndDelete({ orderId });

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete order", error: err.message });
    }
};

module.exports = {
    createOrder,
    viewAllOrders,
    viewOrder,
    updateOrder,
    deleteOrder
};
