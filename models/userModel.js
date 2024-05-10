const db = require('../db');
const queryGen = require('../utils/queryGen');

module.exports = {
    async create(username, password) {
        const { rows } = await db.query(
            queryGen.create('users', { username, password })
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async findOne(options) {
        const { rows } = await db.query(
            queryGen.find('users', options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async update(data, options) {
        const { rows } = await db.query(
            queryGen.update('users', data, options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async delete(options) {
        const { rows } = await db.query(
            queryGen.delete('users', options)
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    },

    async findAll(options) {
        if (options) {
            const { rows } = await db.query(
                queryGen.find('users', options)
            );
            return rows;
        }
        const { rows } = await db.query(
            queryGen.findAll('users')
        );
        return rows;
    },
}