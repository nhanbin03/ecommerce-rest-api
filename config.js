module.exports = {
    PORT: process.env.PORT,
    DB: {
        PGHOST: 'db',
        PGUSER: process.env.PGUSER,
        PGPASSWORD: process.env.PGPASSWORD,
        PGDATABASE: process.env.PGDATABASE,
        PGPORT: process.env.PGPORT, 
    },
    JWT_SECRET: process.env.JWT_SECRET,
}