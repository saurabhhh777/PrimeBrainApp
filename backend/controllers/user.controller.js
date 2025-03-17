import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as GitHubStrategy } from "passport-github2";
import UserModel from "../models/user.model.js";

dotenv.config();


// Google OAuth Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await UserModel.findOne({ email: profile.emails[0].value });
      
      if (!user) {
        // Create new user if doesn't exist
        user = await UserModel.create({
          fullname: profile.displayName,
          email: profile.emails[0].value,
          password: bcryptjs.hashSync(Math.random().toString(36), 10), // Generate random password
          googleId: profile.id
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// // GitHub OAuth Configuration
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "/auth/github/callback"
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await UserModel.findOne({ githubId: profile.id });
      
//       if (!user) {
//         user = await UserModel.create({
//           fullname: profile.displayName || profile.username,
//           email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
//           password: bcryptjs.hashSync(Math.random().toString(36), 10),
//           githubId: profile.id
//         });
//       }
      
//       return done(null, user);
//     } catch (error) {
//       return done(error, null);
//     }
//   }
// ));

// OAuth controller methods
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', async (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Authentication failed",
        success: false
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "User not found or could not be created",
        success: false
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({
      message: "Google login successful!",
      success: true
    });
  })(req, res, next);
};

// export const githubAuth = passport.authenticate('github', {
//   scope: ['user:email']
// });

// export const githubAuthCallback = (req, res, next) => {
//   passport.authenticate('github', async (err, user) => {
//     if (err) return next(err);
    
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
//     return res.status(200).cookie("token", token, {
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     }).json({
//       message: "GitHub login successful!",
//       success: true
//     });
//   })(req, res, next);
// };

// User Signup controller
export const Signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(401).json({
        message: "Please enter all details",
        success: false
      });
    }

    const isUser = await UserModel.findOne({ email });

    if (isUser) {
      return res.status(400).json({
        message: "User already exists!",
        success: false
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await UserModel.create({
      fullname,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const newUser = {
      user:user.fullname,
      email:user.email
    }

    return res.status(200).cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).json({
      newUser,
      message: "Signup successful!",
      success: true
    });
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later!",
      success: false
    });
  }
};

// User login controller
export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password!",
        success: false
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).json({
      message: "Login successful!",
      user,
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later!",
      success: false
    });
  }
};

// Logout controller
export const Logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", {
      maxAge: 0
    }).json({
      message: "Logout successful",
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Update profile name
export const updateProfileName = async (req, res) => {
  try {
    const { fullname } = req.body;
    const id = req.user.id;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false
      });
    }

    await UserModel.findByIdAndUpdate(id, { fullname });

    return res.status(200).json({
      message: "Name updated successfully!",
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later!",
      success: false
    });
  }
};

// Check user authentication
export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Update password
export const updatePass = async (req, res) => {
  try {
    const { password } = req.body;
    const id = req.user.id;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await UserModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    ).select("-password -otp");
    
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false
      });
    }

    return res.status(200).json({
      message: "Password updated successfully!",
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later!",
      success: false
    });
  }
};
