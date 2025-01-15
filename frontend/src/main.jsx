import { StrictMode } from "react";  // Importing StrictMode from React
import { createRoot } from "react-dom/client";  // Importing createRoot for React 18
import "./index.css";  // Importing custom CSS file for styling
import App from "./App.jsx";  // Importing the main App component
import dotenv from "dotenv";  // Importing dotenv for environment variable management
dotenv.config();  // Configuring dotenv to load environment variables

import { GoogleOAuthProvider } from "@react-oauth/google";  // Importing Google OAuth Provider

// Retrieving Google Client ID from environment variables
const GoogleClientId = process.env.GOOGLE_CLIENT_ID;

console.log(GoogleClientId);


createRoot(document.getElementById("root")).render(
  <StrictMode>  
    <GoogleOAuthProvider clientId={`${GoogleClientId}`}>  
      <App />  {/* Rendering the main App component */}
    </GoogleOAuthProvider>
  </StrictMode>
);
