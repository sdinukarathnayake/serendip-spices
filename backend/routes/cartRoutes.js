const express = require('express');
const router = express.Router();
const{createCart, viewAllCarts, viewCart, updateCart, updateCart} = require('../controllers/cartController'); 

router.post('/', createCart);
router.get('/', viewAllCarts);
router.get('/id/:userId',viewCart);
router.put('/id/:userId', updateCart);
router.delete('/:userId', updateCart);
router.delete('/:userId/item/:productId', removeItemFromCart);

module.exports = router;