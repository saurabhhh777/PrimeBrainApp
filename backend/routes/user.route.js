import express from "express";
import { Login, Signup, updateProfile,updatePass,newPass,Logout,checkAuth } from "../controllers/user.controller.js";
const router = express.Router();
import { isAuth } from "../middleware/Authentication.js";


router.route("/signup").post(Signup);
router.route("/signin").post(Login);
router.route("/logout").post(Logout);
router.route("/check",isAuth).get(checkAuth);
router.route("/updateProfile/name").post(isAuth,updateProfile);
router.route("/updateProfile/pass").post(isAuth,updatePass);
router.route("/updateProfile/newpass").post(isAuth,newPass);



export default router;