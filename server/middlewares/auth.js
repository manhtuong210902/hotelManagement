const jwt = require("jsonwebtoken");

const authenToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token not found",
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid token",
            });
        }
        req.userId = data.userId;
        next();
    });
};

module.exports = authenToken;
