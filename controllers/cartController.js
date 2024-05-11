const cartModel = require('../models/cartModel');
const orderModel = require('../models/orderModel');

async function cartCheck(req, res) {
    const { id } = req.user;
    const cartId = req.params.cartId;
    const cart = await cartModel.findOne({ id: cartId });
    if (cart == null) {
        res.status(404).json({ message: 'Cart not found' });
        return false;
    }
    if (cart.user_id !== id) {
        res.status(403).send();
        return false;
    }
    return true;

}

module.exports = {
    async getAllCarts(req, res) {
        try {
            const { id } = req.user;

            const results = await cartModel.findAll({ user_id: id });
            const carts = [];

            for (const row of results) {
                const products = await cartModel.getProducts(row.id);
                carts.push({
                    cart_id: row.id,
                    products
                });
            }

            res.json(carts);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async getCartProducts(req, res) {
        try {
            const { id } = req.user;
            const cartId = req.params.cartId;
            if (!await cartCheck(req, res)) {
                return;
            }

            const products = await cartModel.getProducts(cartId);

            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async createCart(req, res) {
        try {
            const { id } = req.user;

            const cart = await cartModel.create(id);

            res.json(cart);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async deleteCart(req, res) {
        try {
            const { id } = req.user;
            const cartId = req.params.cartId;
            if (!await cartCheck(req, res)) {
                return;
            }

            await cartModel.delete({ id: cartId });

            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async addProduct(req, res) {
        try {
            const { id } = req.user;
            const cartId = req.params.cartId;
            const productId = req.params.productId;
            const quantity = req.body.quantity;

            if (!await cartCheck(req, res)) {
                return;
            }
            const product = await cartModel.addProduct(cartId, productId, quantity);

            res.status(201).json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async updateProduct(req, res) {
        try {
            const { id } = req.user;
            const cartId = req.params.cartId;
            const productId = req.params.productId;
            const quantity = req.body.quantity;

            if (!await cartCheck(req, res)) {
                return;
            }

            const product = await cartModel.updateProduct(cartId, productId, quantity);

            res.status(200).json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async removeProduct(req, res) {
        try {
            const { id } = req.user;
            const cartId = req.params.cartId;
            const productId = req.params.productId;

            if (!await cartCheck(req, res)) {
                return;
            }

            await cartModel.removeProduct(cartId, productId);

            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async checkout(req, res) {
        try {
            const { id } = req.user;
            const cartId = req.params.cartId;

            const order = await orderModel.create(id, cartId);
            res.status(201).json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}