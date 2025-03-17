import express from "express";
import { Signin, Signup, updateProfileName,updatePass,Logout,checkAuth,googleAuth,googleAuthCallback } from "../controllers/user.controller.js";
const router = express.Router();
import { isAuth } from "../middleware/Authentication.middle.js";
import { sendOTPtoMail } from "../middleware/SendOTP.middle.js";
import { verifyOTP } from "../middleware/OTPVerfiy.middle.js";


router.route("/signup").post(Signup);
router.route("/signin").post(Signin);
router.route("/logout").post(Logout);

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);
// router.get('/auth/github', githubAuth);
// router.get('/auth/github/callback', githubAuthCallback);


router.route("/check",isAuth).get(checkAuth);

router.route("/updateProfile/name").post(isAuth,updateProfileName);

router.route("/updateProfile/pass").post(isAuth,sendOTPtoMail,verifyOTP,updatePass);



export default router;