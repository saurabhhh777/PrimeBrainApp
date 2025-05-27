import React from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from '../../store/userAuthStore';
import { Rabbit, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { isLogined, Authuser, isDarkMode, toggleDarkMode } = userAuthStore();

  return (
    <div
      className={`h-[calc(100vh-5.5rem)] box-border w-64 p-4 mt-2 rounded-2xl text-center ml-2 border-2 justify-between ${
        isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-[#e4e4e4] border-gray-300 text-black"
      }`}
    >
      <div className="flex flex-col space-y-8 h-full">
        <div className="items-center justify-items-center">
          <Link to="/">
            <h2 className="flex flex-row text-2xl font-bold font-poppins">
              <Rabbit /><span className="pl-10">PBrain</span>
            </h2>
          </Link>
        </div>
      <hr />

        <div className="flex flex-col space-y-6 font-jost text-xl flex-grow">
          {isLogined && (
            <Link to="/profile">
              <h2 className="hover:text-gray-600">Profile</h2>
            </Link>
          )}
          <Link to="/">
            <h2 className="hover:text-gray-600">Home</h2>
          </Link>
          <Link to="/dashboard/article">
            <h2 className="hover:text-gray-600">Article</h2>
          </Link>
          <Link to="/dashboard/tweets">
            <h2 className="hover:text-gray-600">Twitter</h2>
          </Link>
          <Link to="/dashboard/youtube">
            <h2 className="hover:text-gray-600">Youtube</h2>
          </Link>
          <Link to="/dashboard/reddit">
            <h2 className="hover:text-gray-600">Reddit</h2>
          </Link>
          <Link to="/dashboard/insta">
            <h2 className="hover:text-gray-600">Instagram</h2>
          </Link>
          <Link to="/blogs">
            <h2 className="hover:text-gray-600">Blogs</h2>
          </Link>
          
          <Link to="/setting">
            <h2 className="hover:text-gray-600">Setting</h2>
          </Link>
        </div>

        <div className="flex justify-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;