const db = require('../db');
const queryGen = require('../utils/queryGen');

module.exports = {
    async create(user_id) {
        const { rows } = await db.query(
            queryGen.create('carts', { user_id })
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async findOne(options) {
        const { rows } = await db.query(
            queryGen.find('carts', options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async update(data, options) {
        const { rows } = await db.query(
            queryGen.update('carts', data, options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async delete(options) {
        const { rows } = await db.query(
            queryGen.delete('carts', options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async findAll(options) {
        if (options) {
            const { rows } = await db.query(
                queryGen.find('carts', options)
            );
            return rows;
        }
        const { rows } = await db.query(
            queryGen.findAll('carts')
        );
        return rows;
    },
    
    async addProduct(cart_id, product_id, quantity) {
        const { rows } = await db.query(
            queryGen.create('carts_products', { cart_id, product_id, quantity })
        )
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async getProducts(cart_id) {
        const { rows } = await db.query(
            `SELECT product_id, name, quantity, price, description FROM carts_products cp
            LEFT JOIN products p
            ON cp.product_id = p.id
            WHERE cp.cart_id = ${cart_id}`
        )
        return rows;
    },

    async updateProduct(cart_id, product_id, quantity) {
        const { rows } = await db.query(
            queryGen.update('carts_products', { quantity }, { cart_id, product_id })
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async removeProduct(cart_id, product_id) {
        const { rows } = await db.query(
            queryGen.delete('carts_products', { cart_id, product_id })
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    }   
}