import UserModel from "../models/user.model.js";


export const verifyOTP = async(req,res,next)=>{
    try {
        const {otp} = req.body;
        const id = req.user.id;
        const isUser = await UserModel.findById(id);

        if(!isUser){
            return res.status(400).json({
                message:"User not found !",
                success:false
            });
        }

        if(isUser.otp !== otp){
            return res.status(400).json({
                message:"Invalid OTP !",
                success:false
            });
        }   

        if(isUser.otp === otp){
            isUser.otp = undefined;
            await isUser.save();
            next();
        }        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Server error !",
            success:false
        });
    }
}

