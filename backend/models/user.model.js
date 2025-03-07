import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        type:Number
    },
    links:[{
        type:mongoose.Types.ObjectId,
        ref:"Link",
    }],
    contents:[{
        type:mongoose.Types.ObjectId,
        ref:"Content",
    }],
},{timestamps:true});

const UserModel = mongoose.model("User",userSchema);

export default UserModel;