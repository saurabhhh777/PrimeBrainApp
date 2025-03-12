import React from "react";
import { Rabbit } from "lucide-react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../../../store/userAuthStore";
import DarkModeBtn from "../Buttons/DarkModeBtn";

const NormalNav = () => {
  const { isDarkMode } = userAuthStore();

  return (
    <div>
      <div className={`flex items-center justify-between border-2 ml-3 mr-3 rounded-xl h-12 ${
            isDarkMode ? 
              "bg-gray-600 border-gray-500 text-white" : 
              "bg-[#e4e4e4] border-gray-300"
          }`}>
        <Link to="/">
        <Rabbit
          size={"30"}
          className={`w-28 rounded-xl h-10 ${
            isDarkMode ? 
              "bg-gray-600 border-gray-500 text-white" : 
              "bg-[#e4e4e4] border-gray-300"
          }`
        }
        />

        
        </Link>

        <div
          className={`flex flex-row h-10 space-x-8 bg-[#e4e4e4] rounded-xl pr-8 pl-8 font-poppins  border-gray-300 items-center justify-center ${
            isDarkMode
              ? "bg-gray-600 border-gray-500 text-white"
              : "bg-[#e4e4e4] border-gray-300"
          }`}
        >
          <h2>
            <Link to="/blogs">Blogs</Link>
          </h2>
          <h2>
            <Link to="/signin">Signin</Link>
          </h2>
          <h2>
            <Link to="/signup">Signup</Link>
          </h2>
          <h2>
            <DarkModeBtn />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NormalNav;
