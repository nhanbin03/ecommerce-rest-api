const db = require('../db');
const queryGen = require('../utils/queryGen');
const { getProducts } = require('./cartModel');

module.exports = {
    async create(user_id, cart_id) {
        const client = await db.client();
        try {
            await client.query('BEGIN');
            const cart = await getProducts(cart_id);
            let total = 0;
            for (const product of cart) {
                total += product.price * product.quantity;
            }
            const { rows } = await client.query(
                queryGen.create('orders', {
                    user_id,
                    total
                })
            );
            const order_id = rows[0].id;
            for (const product of cart) {
                await client.query(
                    queryGen.create('orders_products', {
                        order_id,
                        product_id: product.product_id,
                        quantity: product.quantity,
                        name: product.name,
                        price: product.price,
                        description: product.description
                    })
                )
            }

            await client.query('COMMIT');
            return rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },

    async findOne(options) {
        const { rows } = await db.query(
            queryGen.find('orders', options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    }
}