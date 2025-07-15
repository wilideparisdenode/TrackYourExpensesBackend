const jwt = require("jsonwebtoken"); // this is the json web token 
const user = require("../model/userModel");
const AsyncHandle = require("express-async-handler"); // this handles some async exceptions

const protect = AsyncHandle(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            console.log(token);

            // Verify the token
            const decoded = jwt.verify(token, process.env.secretkey); // this extracts the payload from the token

            // Get user from the token
            const User = await user.findOne({ where: { id: decoded.id } }); // find user by ID
            if (!User) {
                return res.status(401).send("Not authorized, user not found");
            }

            req.user = User; // attach the user to the request object
            next();
        } catch (err) {
            console.log(err);
            res.status(401).send("Not authorized, token failed");
        }
    } else {
        res.status(401).send("Not authorized, no token");
    }
});
  
module.exports = protect;