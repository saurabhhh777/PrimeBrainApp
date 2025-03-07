import React from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from '../../../store/userAuthStore';


const Navbar = () => {
  const { isLogined, Authuser } = userAuthStore();

  return (
    <div className="h-[calc(100vh-5.5rem)] box-border w-64 bg-[#e4e4e4] p-4 mt-2 rounded-2xl text-center ml-2 border-2 border-gray-300">
      <div className="flex flex-col space-y-8">
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold font-poppins">Logo</h2>
          </Link>
        </div>
        <div className="flex flex-col space-y-6 font-jost text-xl">
            {
                isLogined && (
                    <Link to="/profile">
                        <h2 className="hover:text-gray-600">Profile</h2>
                    </Link>
                )
            }
          <Link to="/">
            <h2 className="hover:text-gray-600">Home</h2>
          </Link>
          <Link to="/content">
            <h2 className="hover:text-gray-600">Content</h2>
          </Link>
          <Link to="/link">
            <h2 className="hover:text-gray-600 ">Links</h2>
          </Link>
          <Link to="/tags">
            <h2 className="hover:text-gray-600">Tags</h2>
          </Link>
          {!isLogined && (
            <div className="flex flex-col space-y-8">
            <Link to="/login">
              <h2 className="hover:text-gray-600">Login</h2>
            </Link>
            <Link to="/signup">
                <h2 className="hover:text-gray-600">Signup</h2>
            </Link>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
