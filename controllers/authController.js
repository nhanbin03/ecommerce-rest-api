const userModel = require('../models/userModel');
const { JWT_SECRET } = require('../config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

function validate(username, password) {
    if (username.length == 0) {
        throw Error("Username is empty.");
    }
    if (!validator.isLength(password, { min: 6 })) {
        throw Error("Password is not long enough.");
    }
}

function setJwt(res, id) {
    const maxAge = 60 * 60;
    const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: maxAge });
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
}

module.exports = {
    async register(req, res) {
        let { username, password } = req.body;
        try {
            validate(username, password);
            username = username.toLowerCase();
            if (await userModel.findOne({ username })) {
                throw Error("Username is already existed.")
            }

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            const user = await userModel.create(username, password);

            res.status(201).json({ id: user.id, username: user.username });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await userModel.findOne({ username });
            if (user == null) {
                throw Error("Username doesn't exist.");
            }
            const match = await bcrypt.compare(password, user.password);
            if (match == false) {
                throw Error("Password is incorrect.");
            }
            setJwt(res, user.id);
            res.status(200).json({ id: user.id, username: user.username });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}