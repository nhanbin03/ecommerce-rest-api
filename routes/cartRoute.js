const express = require('express');
const router = express.Router();

const { isAuth } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController')

router.use(isAuth);

router.get('/mine', cartController.getAllCarts);
router.post('/mine', cartController.createCart);
router.get('/mine/:cartId', cartController.getCartProducts);
router.delete('/mine/:cartId', cartController.deleteCart);
router.post('/mine/:cartId/:productId', cartController.addProduct);
router.put('/mine/:cartId/:productId', cartController.updateProduct);
router.delete('/mine/:cartId/:productId', cartController.removeProduct);

module.exports = router;