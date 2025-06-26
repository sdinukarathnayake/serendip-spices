const express = require('express');
const router = express.Router();
const{createProduct, viewAllProucts,viewProuct,updateProduct,deleteProduct} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', viewAllProucts);
router.get('/id/:productId', viewProuct);
router.put('/id/:productId', updateProduct);
router.delete('/id/:productId', deleteProduct);
module.exports = router;
