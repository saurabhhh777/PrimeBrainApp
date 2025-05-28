import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthStore } from "../../store/userAuthStore";
import DarkModeBtn from "../components/Buttons/DarkModeBtn";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const { isDarkMode, toggleDarkMode, signup, Authuser, googleAuth } = userAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      await googleAuth();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Google authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await signup(formData);

      if (res && res.success) {
        toast.success("Signup Successful!");
        console.log("User details:", Authuser.newUser.user);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center h-screen w-full text-center ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
      <Toaster />
      <span className="absolute top-5 right-5">
        <DarkModeBtn onClick={toggleDarkMode} />
      </span>

      <div className={`flex flex-col items-center justify-center h-auto p-8 w-96 rounded-2xl border-2 ${
        isDarkMode ? "bg-gray-700 border-gray-500 text-gray-100" : "bg-[#e4e4e4] border-gray-300 text-black"
      }`}>
        <h2 className="font-poppins font-semibold text-2xl mb-4">Signup Page</h2>
        
        <div className="flex flex-col text-center items-center gap-3 w-3/4">
          <input
            type="text"
            placeholder="John Wick"
            className={`border-2 rounded w-full p-2 ${isDarkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-black"}`}
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          
          <input
            type="email"
            placeholder="example@gmail.com"
            className={`border-2 rounded w-full p-2 ${isDarkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-black"}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          
          <input
            type="password"
            placeholder="John@123"
            className={`border-2 rounded w-full p-2 ${isDarkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-black"}`}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          
          <button
            className={`w-full bg-emerald-600 text-white rounded px-4 py-2 mt-2 flex items-center justify-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <button
            className={`w-full bg-blue-500 text-white rounded px-4 py-2 mt-2 flex items-center justify-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {/* ... spinner SVG ... */}
                </svg>
                Signing Up...
              </>
            ) : (
              "Sign Up with Google"
            )}
          </button>

          <p className="mt-2">
            Already have an account?{" "}
            <span className={`hover:underline ${isDarkMode ? "text-blue-400 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"}`}>
              <Link to="/signin">Sign in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;