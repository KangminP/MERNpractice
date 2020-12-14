const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        jwt.verify(token, "longer-secret-is-better");
        next();
    } catch (err) {
        res.status(401).json({ msg: "No token cannot authorize." });
    }
};
