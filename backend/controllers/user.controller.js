import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";



//user Signup controller
export const Signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(401).json({
        message: "please enter all details",
        success: false,
      });
    }

    const isUser = await UserModel.findOne({
      email,
    });

    if (isUser) {
      return res.status(400).json({
        message: "User already exist !",
        success: false,
      });
    }

    const doublepassword = bcryptjs.hash(password, process.env.PASSWORD_HASH_VALUE);

    const user = await UserModel.create({
      fullname: fullname,
      email: email,
      password: doublepassword,
    });

    const token =  jwt.sign({
      id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"7d"
    });

    return res.status(200).cookie("token",token,{
      maxAge:7*24*60*60*1000,
    }).json({
      message:"Signup successfully !",
      success:true
    });
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error , please try agian later !",
      success: false,
    });
  }
};




//user login controller

export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await UserModel.findOne({
      email,
    });

    if (!isUser) {
      return res.status(400).json({
        message: "User not found !",
        success: false,
      });
    }

    const isOkay = bcryptjs.compare(password, isUser.password);

    if (!isOkay) {
      return res.status(400).json({
        message: "Password is wrong !",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: isUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login Successfully !",
        isUser,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error , please try again later !",
      success: false,
    });
  }
};


//logout controller 
export const Logout = ()=>{
  try {

    return res.status(200).cookie("token",token,{
      maxAge:0,
    }).json({
      message:"Logout successfully",
      success:true,
    });

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      message:"Server error , please try again later",
      successL:false
    });

  }



}





//updating user name 
export const updateProfileName = async(req, res) => {
  try {
    const fullname = req.body.fullname;

    const id = req.user.id;

    let isUser = await UserModel.findById(id);

    if(!isUser){
      return res.status(400).json({
        message:"User not exist !",
        success:false,
      });
    }


    isUser = {
      fullname:fullname,
      email:isUser.email,
      password:isUser.password
    }

    const filter = {_id:id};
    const update = { $set: {fullname:`${fullname}`} };

    await UserModel.updateOne(filter,update);
    

    return res.status(200).json({
      message:"name updated !",
      success:true,
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error , please try again later !",
      success: false,
    });
  }
};



//cheking User authentication 
export const checkAuth = async (req,res)=>{
  try {
    return res.status(200).json({
      success:true,
      user:req.user,
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Server error, please try again later ",
      success:false,
    });

  }


}



//update password of user 

export const updatePass = async(req,res)=>{
  try {
    const password = req.body.password;

    const id = req.user.id;

    const doublePassword = bcryptjs.hash(password,process.env.PASSWORD_HASH_VALUE);

    const isUser = await UserModel.findOneAndUpdate(
      {_id:id},
      {$set:{password:doublePassword}},
      {new:true}
    ).select("-password","-otp");
    
    if(!isUser){
      return res.status(400).json({
        message:"User not found !",
        isUser, 
        success:false,
      });
    }

    return res.status(200).json({
      message:"Password updated successfully !",
      success:true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Server error , please try again later !",
      success:false,
    });
  }
}





