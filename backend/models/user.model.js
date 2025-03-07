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
    googleId:{
        type:String,
    },
    githubId:{
        type:String,
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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