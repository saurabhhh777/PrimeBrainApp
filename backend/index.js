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
import blogRoute from "./routes/blog.route.js";
import socialLinkRoute from "./routes/socialLink.route.js";
import newsletterRoute from "./routes/newsletter.route.js";
import UserModel from "./models/user.model.js";

const app = express();

// Connect to the database
connectDB().catch(console.error);

// Set up cookie-session middleware as an alternative to express-session
app.use(
  cookieSession({
    name: "session", // Name of the session cookie
    keys: ["secret"], // Secret keys used to encrypt the cookie, use a strong key in production
    maxAge: 30 * 24 * 60 * 60 * 1000, // Session duration: 30 days
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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:7000/api/v1/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists by googleId first
        let user = await UserModel.findOne({ googleId: profile.id });
        
        if (!user) {
          // Check if user exists by email
          user = await UserModel.findOne({ email: profile.emails[0].value });
          
          if (user) {
            // Update existing user with googleId
            user.googleId = profile.id;
            await user.save();
          } else {
            // Create a new user
            user = await UserModel.create({
              fullname: profile.displayName,
              email: profile.emails[0].value,
              password: bcryptjs.hashSync(Math.random().toString(36), 10),
              googleId: profile.id,
              avatar: profile.photos?.[0]?.value || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            });
          }
        }
        
        return done(null, user);
      } catch (error) {
        console.error('Google OAuth Strategy Error:', error);
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
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/social-links", socialLinkRoute);
app.use("/api/v1/newsletter", newsletterRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
