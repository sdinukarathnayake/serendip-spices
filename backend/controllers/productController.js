const Product = require('../modules/productModel');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { productId, productName, pricePerKg, description, origin, userId } = req.body;

        if (!productId || !productName || !pricePerKg || !description || !origin || !userId) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Check if image file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Product image is required." });
        }

        const newProduct = new Product({
            productId,
            productName,
            pricePerKg,
            description,
            origin,
            userId,
            productImage: req.file.filename
        });

        await newProduct.save();
        res.status(201).json({ message: "New product created successfully", product: newProduct });
    } catch (err) {
        res.status(500).json({ message: "Failed to create product", error: err.message });
    }
};

// View all products
const viewAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products", error: err.message });
    }
};

// View a single product by productId
const viewProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: "Invalid product ID", error: err.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, pricePerKg, description, origin, userId } = req.body;

        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Prepare update object
        const updateData = {
            productName,
            pricePerKg,
            description,
            origin,
            userId
        };

        if (req.file) {
            updateData.productImage = req.file.filename;
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { productId },
            updateData,
            { new: true }
        );

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Failed to update product", error: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findOneAndDelete({ productId });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
};

module.exports = {
    createProduct,
    viewAllProducts,
    viewProduct,
    updateProduct,
    deleteProduct
};
