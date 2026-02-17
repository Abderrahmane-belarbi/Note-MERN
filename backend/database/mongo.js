import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
