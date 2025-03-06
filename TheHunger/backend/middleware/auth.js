import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(403).json({ success: false, message: "Session expired. Please log in again." });
                }
                return res.status(403).json({ success: false, message: "Invalid Token" });
            }

            req.user = decoded;
            next();
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error during authentication" });
    }
};

export default authMiddleware;
