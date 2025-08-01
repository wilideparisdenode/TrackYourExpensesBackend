const jwt = require("jsonwebtoken");
const user = require("../model/userModel");
const AsyncHandle = require("express-async-handler");

const protect = AsyncHandle(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.secretkey);
            const User = await user.findOne({ _id: decoded.id }); // Use _id for Mongoose
            if (!User) {
                return res.status(401).send("Not authorized, user not found");
            }
            req.user = User;
            next();
        } catch (err) {
            console.log(err);
            res.status(401).send("Not authorized, token failed");
        }
    } else {
        res.status(401).send("Not authorized, no token");
    }
});

// Admin middleware
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).send("Not authorized as admin");
    }
};

module.exports = { protect, isAdmin };