const express = require('express');
const router = express.Router();
const{createProduct, viewAllProducts,viewProduct,updateProduct,deleteProduct} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', viewAllProducts);
router.get('/id/:productId', viewProduct);
router.put('/id/:productId', updateProduct);
router.delete('/id/:productId', deleteProduct);

module.exports = router;
