import nodemailer from "nodemailer";
import UserModel from "../models/user.model.js";

export const sendOTPtoMail = async (req, res, next) => {
  try {
    // req.id is incorrect, should be req.user.id since we're using isAuth middleware
    const id = req.user.id;

    const isUser = await UserModel.findById(id);

    if (!isUser) {
      return res.status(400).json({
        message: "User not found !",
        success: false,
      });
    }

    const transporter = nodemailer.createTransport({
      host: `smtp.gmail.com`,
      port: 465,
      secure: true,
      auth: {
        user: `${process.env.GMAIL}`,
        pass: `${process.env.GMAIL_PASS}`,
      },
    });

    // Generate OTP synchronously since we don't need async here
    const generateOTP = () => {
      let real_otp = Math.floor(Math.random() * 10000);
      // Pad with leading zeros if less than 4 digits
      real_otp = real_otp.toString().padStart(4, '0');
      return real_otp;
    };

    const otp = generateOTP();
    isUser.otp = otp;
    await isUser.save();

    const mailOptions = {
      from: `"Saurabh Maurya" <${process.env.GMAIL}>`,
      to: isUser.email, // Use user's email from database instead of undefined userGmail
      subject: `Password Reset OTP - BrainlyApp`,
      text: `Your OTP for password reset is: ${otp}`,
      html: `<b>Your OTP for BrainlyApp password reset is: ${otp}</b>`,
    };

    await transporter.sendMail(mailOptions);
    next();

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to send OTP. Please try again later.",
      success: false,
    });
  }
};
