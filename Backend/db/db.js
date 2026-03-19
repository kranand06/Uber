import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const DB_URL = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with an error code
  }
}

export default connectDB;