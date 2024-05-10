module.exports = {
    PORT: process.env.PORT,
    DB: {
        PGHOST: process.env.PGHOST,
        PGUSER: process.env.PGUSER,
        PGPASSWORD: process.env.PGPASSWORD,
        PGDATABASE: process.env.PGDATABASE,
        PGPORT: process.env.PGPORT, 
    },
    JWT_SECRET: process.env.JWT_SECRET,
}