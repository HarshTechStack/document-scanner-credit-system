import express from "express";
import multer from "multer";
import Tesseract from "tesseract.js";
// Removed: import pdfParse from "pdf-parse";
import ScannedDocument from "../models/ScannedDocument.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const today = new Date().toISOString().split("T")[0];
    if (user.lastCreditDate !== today) {
      user.credits = 20;
      user.lastCreditDate = today;
      await user.save();
    }
    if (user.credits <= 0) {
      return res.status(403).json({ message: "Not enough credits" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const mimeType = req.file.mimetype;
    let text = "";

    if (mimeType.startsWith("image/")) {
      const { data } = await Tesseract.recognize(req.file.buffer, "eng");
      text = data.text.trim();
    } else if (mimeType === "text/plain") {
      text = req.file.buffer.toString("utf-8").trim();
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    if (!text || text.length < 5) {
      return res.status(400).json({ message: "Unable to extract text. Please try another file." });
    }

    user.credits -= 1;
    await user.save();

    const scannedDoc = new ScannedDocument({
      user: user._id,
      text,
      createdAt: new Date(),
    });
    await scannedDoc.save();

    res.json({ message: "Scan successful", text, credits: user.credits });

  } catch (error) {
    console.error("Scan error:", error.message);
    res.status(500).json({ message: "Scanning failed", error: error.message });
  }
});

export default router;
