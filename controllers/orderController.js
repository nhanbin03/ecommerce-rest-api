const orderModel = require('../models/orderModel');

async function orderCheck(req, res) {
    const { id } = req.user;
    const orderId = req.params.orderId;
    const order = await orderModel.findOne({ id: orderId });
    if (order == null) {
        res.status(404).json({ message: 'Order not found' });
        return false;
    }
    if (order.user_id !== id) {
        res.status(403).send();
        return false;
    }
    return true;
}


module.exports = {
    async getAllOrders(req, res) {
        try {
            const { id } = req.user;
            const orders = await orderModel.findAll({ user_id: id });

            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async getOrder(req, res) {
        try {
            const { id } = req.user;
            const orderId = req.params.orderId;

            const order = await orderModel.findOne({ id: orderId });
            if (order == null) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            if (order.user_id !== id) {
                res.status(403).send();
                return;
            }

            const products = await orderModel.getProducts(orderId);

            res.json({ ...order, products });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
}


// router.get('/mine', orderController.getAllOrders);
// router.get('/mine/:orderId', orderController.getOrder);