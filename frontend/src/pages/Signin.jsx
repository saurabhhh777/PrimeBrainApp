import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import { userAuthStore } from "../../store/userAuthStore";
import DarkModeBtn from "../components/Buttons/DarkModeBtn";

const Signin = () => {
  // Extract both the isDarkMode boolean and the toggleDarkMode function
  const { isDarkMode, toggleDarkMode,signin } = userAuthStore();

  const [formdata , setFormdata] = useState({
    email:"",
    password:""
  });
  

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormdata((data)=>({
      ...data,[name]:value
    }))
  }

  const handleSubmit = ()=>{
    signin(data);
  }

  return (
    <div
      className={`flex items-center justify-center h-screen w-full text-center ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Dark Mode button */}
      <span className="absolute top-5 right-5 ">
        <DarkModeBtn onClick={toggleDarkMode} />
      </span>

      <div
        className={`flex flex-col items-center justify-center h-96 w-96 rounded-2xl border-2 
        ${isDarkMode ? "bg-gray-700 border-gray-500 text-gray-100" : "bg-[#e4e4e4] border-gray-300 text-black"}`}
      >
        <h2 className="font-poppins font-semibold text-2xl mb-4">Signin Page</h2>

        <div className="flex flex-col text-center items-center gap-3 w-3/4">
          <input
            type="text"
            placeholder="example@gmail.com"
            className={`border-2 rounded w-full p-2 
              ${isDarkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-black"}`}

              name="email"
              value={formdata.email}
              onChange={handleChange}

          />
          <input
            type="password"
            placeholder="John@123"
            className={`border-2 rounded w-full p-2
              ${isDarkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-black"}`}

              name="password"
              value={formdata.password}
              onChange={handleChange}

          />
          <button className="bg-emerald-600 text-white rounded px-4 py-2 mt-2"
            onClick={handleSubmit}
          >
            Sign In
          </button>

          <p className="mt-2">
            Don't have an account?{" "}
            <span
              className={`hover:underline
                ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-200"
                    : "text-blue-600 hover:text-blue-800"
                }`}
            >
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
