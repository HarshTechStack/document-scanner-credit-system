import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("adminpassword", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin", // ✅ Set role as admin
    });

    console.log("✅ Admin created:", admin);
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
