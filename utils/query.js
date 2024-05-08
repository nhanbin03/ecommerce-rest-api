module.exports = {
    create: (table, data) => {
        const keys = Object.keys(data);
        const values = Object.values(data);
        return `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')}) RETURNING *`;
    },

    findOne: (table, options) => {
        const conditions = [];
        for (const key in options) {
            conditions.push(`${key} = ${options[key]}`);
        }
        return `SELECT * FROM ${table} WHERE ${conditions.join(' AND ')} RETURNING *`;
    },

    update: (table, data, options) => {
        
    }
}