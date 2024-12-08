const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication failed. Please login with your username and password" });
    }

    try {
        const decoded = jwt.verify(token, process.env.MY_SECRET_CODE); 
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
};
