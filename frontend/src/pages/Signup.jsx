import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { userAuthStore } from "../../store/userAuthStore";
import DarkModeBtn from "../components/Buttons/DarkModeBtn";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const { isDarkMode, toggleDarkMode, signup, Authuser, googleAuth, checkAuth } = userAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check for OAuth callback parameters
  useEffect(() => {
    const authStatus = searchParams.get('auth');
    const error = searchParams.get('error');
    
    if (authStatus === 'success') {
      toast.success("Google signup successful!");
      checkAuth();
      // Redirect to intended destination or dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } else if (error) {
      if (error === 'auth_failed') {
        toast.error("Google authentication failed");
      } else if (error === 'user_not_found') {
        toast.error("User not found");
      }
    }
  }, [searchParams, navigate, checkAuth, location]);

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
    // Client-side validation
    if (!formData.fullname || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation (minimum 6 characters)
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      const res = await signup(formData);

      if (res && res.success) {
        toast.success("Signup Successful!");
        console.log("User details:", Authuser.newUser.user);
        // Redirect to intended destination or dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
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
        
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col text-center items-center gap-3 w-3/4">
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
          
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="John@123"
              className={`border-2 rounded w-full p-2 pr-10 ${isDarkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-black"}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 ${
                isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          
          <button
            type="submit"
            className={`w-full bg-emerald-600 text-white rounded px-4 py-2 mt-2 flex items-center justify-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
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

          <div className="relative w-full my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-[#e4e4e4] text-gray-500"}`}>
                Or continue with
              </span>
            </div>
          </div>

          <button
            className={`w-full bg-white text-gray-700 rounded px-4 py-2 mt-2 flex items-center justify-center border-2 border-gray-300 hover:bg-gray-50 ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? "Signing Up..." : "Sign up with Google"}
          </button>

          <p className="mt-2">
            Already have an account?{" "}
            <span className={`hover:underline ${isDarkMode ? "text-blue-400 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"}`}>
              <Link to="/signin">Sign in</Link>
            </span>
          </p>

          <div className="mt-4 pt-4 border-t border-gray-300">
            <Link
              to="/"
              className={`text-sm hover:underline ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              ← Go to Home Page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;