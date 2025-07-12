const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { itemname, priceperkg, sellerId } = req.body;

    const product = await Product.create({ itemname, priceperkg, sellerId });
    res.status(201).json({ message: 'Product Added..', product });
    
  } catch (err) {
    res.status(500).json({ message: 'Error adding product..', error: err.message });
  }
};

exports.viewAllProducts = async (_req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};


exports.viewProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
    
  } catch (err) {
    res.status(400).json({ message: 'Invalid Product ID..', error: err.message });
  }
};


exports.viewProductsBySeller = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const products = await Product.findAll({
      where: { sellerId }
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found for seller ${sellerId}` });
    }

    res.json(products);

  } catch (err) {
    res
      .status(400)
      .json({ message: 'Invalid seller ID or database error', error: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const [rowsAffected, [updatedProduct]] = await Product.update(req.body, {
      where: { productId: req.params.productId },
      returning: true
    });

    if (!rowsAffected) return res.status(404).json({ message: "Product not found" });
  
    res.json({ message: 'Product updated', product: updatedProduct });
    
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { productId: req.params.productId } });

    if (!deleted) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product removed..' });

  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};