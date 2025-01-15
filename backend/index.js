import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";


//connecting with data base 
connectDB();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//cors for cross origin sharing !
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:"GET,POST,PUT,DELETE",

}));



//api's calls
app.use("/api/v1/user",userRoute);



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at : ${PORT}`);
});
