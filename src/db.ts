import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://saurabhtiwari3478:itTBt3LcOedOtRym@cluster0.muie8fx.mongodb.net/`);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
