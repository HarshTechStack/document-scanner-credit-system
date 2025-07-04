import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config(); // ✅ Load environment variables

// ✅ **User Authentication Middleware**
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // 🔒 Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Find User & Exclude Password
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: user._id.toString(), role: user.role }; // ✅ Store necessary details

    next();
  } catch (error) {
    console.error("Auth Error:", error.message); // ✅ Log JWT errors for debugging
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

// ✅ **Admin Authorization Middleware**
export const adminMiddleware = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

export default authMiddleware;
