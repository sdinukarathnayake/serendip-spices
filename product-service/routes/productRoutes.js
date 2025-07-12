const express = require('express');

const {addProduct, viewAllProducts, viewProduct, viewProductsBySeller, updateProduct, deleteProduct} = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/',verifyToken, addProduct);
router.get('/', verifyToken, viewAllProducts);
router.get('/products/:sellerId', verifyToken, viewProductsBySeller);
router.get('/:productId', verifyToken, viewProduct);
router.put('/:productId', verifyToken, updateProduct);
router.delete('/:productId', verifyToken, deleteProduct);

module.exports = router;