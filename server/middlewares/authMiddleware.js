// const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
    let token;
    if (
        // TOken is send inside of the headers
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // decodes token id and verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next()

        } catch (err) {
            res.status(401);
            res.json({
                message: "Not Authorized, token Failed"
            })
        }
    }
    if (!token) {
        res.status(401);
        res.json({
            message: "Not Authorized, token Failed"
        })
    }
};

module.exports = { protect }