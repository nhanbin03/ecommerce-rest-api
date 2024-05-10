const db = require('../db');
const queryGen = require('../utils/queryGen');

module.exports = {
    async create(name, description, price, stock) {
        const { rows } = await db.query(
            queryGen.create('products', { name, description, price, stock })
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async findOne(options) {
        const { rows } = await db.query(
            queryGen.find('products', options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async update(data, options) {
        const { rows } = await db.query(
            queryGen.update('products', data, options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async delete(options) {
        const { rows } = await db.query(
            queryGen.delete('products', options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async findAll() {
        const { rows } = await db.query(
            queryGen.findAll('products')
        );
        return rows;
    },
}