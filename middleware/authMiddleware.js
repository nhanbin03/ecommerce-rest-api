const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    async isAuth(req, res, next) {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.redirect('/login');
                } else {
                    next();
                }
            })
        } else {
            res.redirect('/login');
        }
    }
}