import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import bcryptjs from "bcryptjs";
// Import cookie-session as an alternative to express-session
import cookieSession from "cookie-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Load environment variables from .env file
dotenv.config();

// Import your database connection function, routes, and user model
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import contentRoute from "./routes/content.route.js";
import UserModel from "./models/user.model.js";

const app = express();

// Connect to the database
connectDB();

// Set up cookie-session middleware as an alternative to express-session
app.use(
  cookieSession({
    name: "session", // Name of the session cookie
    keys: ["secret"], // Secret keys used to encrypt the cookie, use a strong key in production
    maxAge: 24 * 60 * 60 * 1000, // Session duration: 24 hours
  })
);

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies attached to the client request
app.use(cookieParser());

// Enable CORS to allow cross-origin requests from your frontend
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

// Initialize Passport for authentication handling
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth Strategy for Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,         // Your Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,   // Your Google Client Secret
      callbackURL: "/auth/google/callback",             // URL to handle Google OAuth callback
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Attempt to find an existing user by email
        let user = await UserModel.findOne({ email: profile.emails[0].value });
        
        if (!user) {
          // Create a new user if one doesn't exist
          user = await UserModel.create({
            fullname: profile.displayName,
            email: profile.emails[0].value,
            // Generate a random password (consider a more robust solution for production)
            password: bcryptjs.hashSync(Math.random().toString(36), 10),
            googleId: profile.id,
          });
        }
        
        // Return the authenticated user
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user data into the session
passport.serializeUser((user, done) => done(null, user));

// Deserialize user data from the session
passport.deserializeUser((user, done) => done(null, user));

// Set up user routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/content",contentRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
