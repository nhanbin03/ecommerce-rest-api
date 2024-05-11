const express = require('express');
const router = express.Router();

const { isAuth } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController')

router.use(isAuth);

router.get('/mine', orderController.getAllOrders);
router.get('/mine/:orderId', orderController.getOrder);

module.exports = router;