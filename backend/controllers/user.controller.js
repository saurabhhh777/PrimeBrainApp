import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
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

    const doublepassword = await bcrypt.hash(password, 12);

    await UserModel.create({
      fullname: fullname,
      email: email,
      password: doublepassword,
    });

    return res.status(200).json({
      message: "Register successfully !",
      success: true,
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

export const Login = async (req, res) => {
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

    const isOkay = bcrypt.compare(password, isUser.password);

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
export const updateProfile = async(req, res) => {
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
    // const password = req.body.password;

    const id = req.user.id;

    const isUser = await UserModel.findById(id);

    if(!isUser){
      return res.status(400).json({
        message:"User not exist !",
        success:false
      });
    }

    const userGmail = isUser.email;

    // const newPassword = await bcrypt.hash(password,12);

    const transporter = nodemailer.createTransport({
      host:`smtp.gmail.com`,
      port:465,
      secure:true,
      auth:{
        user:`${process.env.GMAIL}`,
        pass:`${process.env.GMAIL_PASS}`,

      },

    });

    const otp = async()=>{
      let real_otp = Math.floor(Math.random()*10000);
      isUser.otp = real_otp;
      await isUser.save();
      return real_otp;
    }

    const mailOptions = {
      from:`"Saurabh Maurya" <${process.env.GMAIL}>`,
      to:`${userGmail}`,
      subject:`Hello from BrainlyApp`,
      text:`This is a plan text mail body`,
      html:`<b>This is a OTP for Brainly Password reset ${otp()}</b>`
    };


    await transporter.sendMail(mailOptions);

    console.log(`Your new Password is : ${password}`);

    return res.status(200).json({
      message:"email sent successfully !", 
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


//for creating the new password 
export const newPass = async(req,res)=>{
  try {
    const newPaword = req.body.password;

    const id = req.user.id;

    const isUser = await isUser.findById(id);

    if(!isUser){
      return res.status(400).json({
        message:"User not exist !",
        success:false
      });
    }

    const doubleNewPass = await bcrypt.hash(newPaword,12);

    const filter = {_id:id};
    const update = {$set: {password:`${doubleNewPass}`}}; 

    await UserModel.updateOne(filter,update);

    return res.status(200).json({
      message:"Password update successfully !",
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



