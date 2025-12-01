import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("🟢 Connected to MongoDB");
  } catch (err) {
    console.error("🔴 MongoDB connection error:", err);
    process.exit(1);
  }
};
