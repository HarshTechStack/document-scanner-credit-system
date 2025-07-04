import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import listEndpoints from "express-list-routes"; // ✅ Import package

import authRoutes from "./routes/authRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // ✅ Import Admin Routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ List all defined routes in the console (Fix applied)
const routes = listEndpoints(app);
routes.forEach((route) => {
  console.log(`${route.methods?.join(", ") || "UNKNOWN"} -> ${route.path || "UNKNOWN"}`);
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
