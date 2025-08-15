import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/primebrain");
        console.log("MongoDB is connected!");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        console.log("Server will continue without database connection");
    }
}

export default connectDB;