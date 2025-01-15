import mongoose from "mongoose";

const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB is connected !");
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDB;