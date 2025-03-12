import React from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../../../store/userAuthStore";
import DarkModeBtn from "../Buttons/DarkModeBtn";

const Signup = () => {
  const { isDarkMode, toggleDarkMode } = userAuthStore();

  return (
    <div
      className={`flex items-center justify-center h-screen w-full text-center
        ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <span className="absolute top-5 right-5">
        <DarkModeBtn onClick={toggleDarkMode} />
      </span>

      <div
        className={`flex flex-col items-center justify-center h-96 w-96 rounded-2xl border-2 
        ${
          isDarkMode
            ? "bg-gray-700 border-gray-500 text-gray-100"
            : "bg-[#e4e4e4] border-gray-300 text-black"
        }`}
      >
        <h2 className="font-poppins font-semibold text-2xl mb-4">
          Signup Page
        </h2>
        <div className="flex flex-col text-center items-center gap-3 w-3/4 ">
          <input
            type="text"
            placeholder="John Wick"
            className={`border-2 rounded w-full p-2 
              ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            className={`border-2 rounded w-full p-2 
              ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
          />
          <input
            type="password"
            placeholder="John@123"
            className={`border-2 rounded w-full p-2 
              ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
          />
          <button
            className={`rounded px-4 py-2 mt-2 
              ${
                isDarkMode
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-600 text-white"
              }`}
          >
            Sign Up
          </button>
          <p className="mt-2">
            Already have an account?{" "}
            <span
              className={`hover:underline
                ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-200"
                    : "text-blue-600 hover:text-blue-800"
                }`}
            >
              <Link to="/signin">Sign in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
