import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const isAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized user !",
                success:false,
            });
        }

        let data = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id).select("-password");
        next();

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Server error , please try again later !",
            success:false,
        });
    }
}
