import express from "express";
import User from "../models/User.js";
import authMiddleware, { adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ **Grant Extra Credits (Admin Only)**
router.post("/grant-credits", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId, credits } = req.body;

    if (!userId || !credits || credits <= 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.credits += credits;
    await user.save();

    res.json({ message: `Added ${credits} credits to ${user.email}`, totalCredits: user.credits });
  } catch (error) {
    res.status(500).json({ message: "Failed to update credits", error: error.message });
  }
});

export default router;
