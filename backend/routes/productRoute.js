const express = require('express');
const router = express.Router();
const{createProduct, viewAllProucts,viewProuct,updateProduct,deleteProduct} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', viewAllProucts);
router.get('/id/:userId', viewProuct);
router.get('/type/:type', viewProuct);
router.put('/id/:userId', updateProduct);
router.delete('/id/:userId', deleteProduct);

module.exports = router;
