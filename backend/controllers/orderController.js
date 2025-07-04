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
            orderStatus,       // Optional
            paymentStatus      // Optional
        } = req.body;

        // Check required fields only
        if (!orderId || !userId || !items || !Array.isArray(items) || !subTotal || !deliveryFee || !orderTotal) {
            return res.status(400).json({ message: "Missing or invalid required fields." });
        }

        
        const newOrder = new Order({
            orderId,
            userId,
            items,
            subTotal,
            deliveryFee,
            orderTotal,
            
        });

        await newOrder.save();
        res.status(201).json({ message: "New order created successfully", Order: newOrder });

    } catch (err) {
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
        const updateData = req.body;

        // Optional: Validate items if provided
        if (updateData.items) {
            if (!Array.isArray(updateData.items)) {
                return res.status(400).json({ message: "Items must be an array." });
            }

            for (const item of updateData.items) {
                if (!item.productId || typeof item.quantity !== 'number' || typeof item.itemTotal !== 'number') {
                    return res.status(400).json({ message: "Each item must have productId, quantity, and itemTotal." });
                }
            }
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            updateData,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order updated successfully", Order: updatedOrder });
    } catch (err) {
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