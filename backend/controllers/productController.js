const Product = require('../modules/userModel');

const createProduct = async (req,res) =>{

    try{
         const{productId, productName, pricePerKg, sellerId, sellerName, description, origin, catalogue} = req.body;

        if(!productId || !productName|| !pricePerKg|| !sellerId|| !sellerName|| !description|| !origin|| !catalogue){
            res.status(400).json({message: "Missing required fields."});
        };

        const newProduct = new Product ({productId, productName, pricePerKg, sellerId, sellerName, description, origin, catalogue});
    await newProduct.save();
    res.status(201).json({ message : "New product created successfully", Product: newProduct});
    
    }
    catch (err){
res.status(500) .json({message : "Failed to create product"});
    }
};

const viewAllProucts = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500) .json({message: "Failed to fetch users"});
    }
};

const viewProuct = async (req, res) => {
    try{
        const {productId} = req.params;
        const product = await Product.findOne({productId});

        if (!product) return res.status(404).jsonm({ message :"User not found"});
         res.status(200).json(product);
    }
    catch(err){
        res.status(400).json({message: "Invalid product ID", 
        error: err.message });
    }
};

const updateProduct = async (req, res) =>{
 try{
    const {productId} = req.params;
const { productName, pricePerKg, sellerId, sellerName, description, origin, catalogue}= req.body;

const product = await Product.findOne({productId});


if(!product){
    return res.status(404).json({ message: "Product not found"});
};

const updateProduct = await Product.findOneAndUpdate(
    {productId}, {productId, productName, pricePerKg, sellerId, sellerName, description, origin, catalogue}, {new: true}
);

res.status(200).json ({message:"Product updated successfully", Product: updateProduct});
}
 catch(err){
    res.status(500).json ({message : " Failed to update product", error: err.message});
 }
};


const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await product.findOneAndDelete({productId});
        res.status(200).json({ message: "Product deleted successfully", Product: product });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
};

module.exports = {createProduct, viewAllProucts,viewProuct,updateProduct,deleteProduct}