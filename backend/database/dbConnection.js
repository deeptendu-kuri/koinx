import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const mongoDB=process.env.MONGO_URL
const connectDB = async () => {
    try {
        await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully.");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

export default connectDB;
