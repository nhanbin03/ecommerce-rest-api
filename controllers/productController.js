const productModel = require('../models/productModel');

module.exports = {
    async getAllProducts(req, res) {
        try {
            const products = await productModel.findAll();

            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async getProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await productModel.findOne({ id });

            if (product == null)  {
                res.status(404).json({ message: 'Product not found' });
            }

            res.json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}