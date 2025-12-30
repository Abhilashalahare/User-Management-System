import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URI;
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
   
  }
};

export default connectDB;