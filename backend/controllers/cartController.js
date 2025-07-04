const Cart = require('../modules/cartModel');

// Create user's cart
const createCart = async (req, res) => {
    try {
        const { userId, productId, quantity,total,cartTotal} = req.body;

        if (!userId || !productId || quantity || !total || !cartTotal) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if cart already exists
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Update existing cart
            cart.items = items;
            cart.cartTotal = cartTotal;
            await cart.save();

            return res.status(200).json({ message: "Cart updated successfully", cart });
        } else {
            // Create new cart
            const newCart = new Cart({
                userId, productId, quantity, total, cartTotal
            });
            await newCart.save();

            return res.status(201).json({ message: "Cart created successfully", cart: newCart });
        }

    } catch (err) {
        res.status(500).json({ message: "Failed to create or update cart", error: err.message });
    }
};

// Get all carts 
const viewAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch carts", error: err.message });
    }
};

// Get a user's cart
const viewCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cart", error: err.message });
    }
};

// Update a user's cart
const updateCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items are required for updating cart." });
        }

        let cartTotal = 0;
        
        for (const item of items) {
            if (!item.productId || item.quantity == null || item.total == null) {
                return res.status(400).json({ message: "Each item must have productId, quantity, and total." });
            }
            cartTotal += item.total;
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { items, cartTotal },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
    } catch (err) {
        res.status(500).json({ message: "Failed to update cart", error: err.message });
    }
};

// Delete a user's cart
const deleteCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedCart = await Cart.findOneAndDelete({ userId });

        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Cart deleted successfully", cart: deletedCart });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete cart", error: err.message });
    }
};

// Remove a single item from user's cart
const removeItemFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const filteredItems = cart.items.filter(item => item.productId !== productId);
        const updatedTotal = filteredItems.reduce((sum, item) => sum + item.total, 0);

        cart.items = filteredItems;
        cart.cartTotal = updatedTotal;

        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove item from cart", error: err.message });
    }
};

module.exports = {
    createCart,
    viewAllCarts,
    viewCart,
    updateCart,
    deleteCart,
    removeItemFromCart
};
