module.exports = {
    create(table, data) {
        const keys = Object.keys(data);
        const values = Object.values(data).map((value) => '\'' + value + '\'');
        return `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')}) RETURNING *`;
    },

    find(table, options) {
        const conditions = [];
        for (const key in options) {
            conditions.push(`${key} = '${options[key]}'`);
        }
        return `SELECT * FROM ${table} WHERE ${conditions.join(' AND ')}`;
    },

    update(table, data, options) {
        const assignments = [];
        for (const key in options) {
            assignments.push(`${key} = '${data[key]}'`);
        }
        const conditions = [];
        for (const key in options) {
            conditions.push(`${key} = '${options[key]}'`);
        }
        return `UPDATE ${table} SET ${assignments.join(', ')} WHERE ${conditions.join(' AND ')} RETURNING *`;
    },

    delete(table, options) {
        const conditions = [];
        for (const key in options) {
            conditions.push(`${key} = '${options[key]}'`);
        }
        return `DELETE FROM ${table} WHERE ${conditions.join(' AND ')} RETURNING *`;
    },

    findAll(table) {
        return `SELECT * FROM ${table}`;
    },
};