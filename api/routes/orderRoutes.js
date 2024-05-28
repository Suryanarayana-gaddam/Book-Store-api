const express = require('express');
const router = express.Router();


const orderControllers = require('../controllers/orderController')
const verifyToken = require('../middleware/verifyToken')

router.post('/:userId/add/orders', verifyToken, orderControllers.uploadOrder);
router.get('/:userId/get/orders', verifyToken, orderControllers.getOrderById);
router.get('/get/all-orders', verifyToken, orderControllers.getAllOrders);


module.exports = router ;