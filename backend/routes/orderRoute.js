const express = require('express');
const router = express.Router();
const{createOrder, viewAllOrders, viewOrder, updateOrder, deleteOrder} = require('../controllers/orderController'); 

router.post('/', createOrder);
router.get('/', viewAllOrders);                 
router.get('/id/:orderId', viewOrder);
router.put('/id/:orderId', updateOrder);
router.delete('/id/:orderId', deleteOrder);

module.exports = router;