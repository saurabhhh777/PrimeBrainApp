import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, LogOut, User, Settings } from "lucide-react";
import { userAuthStore } from "../../store/userAuthStore.jsx";
import { Link ,useNavigate} from "react-router-dom";


const Hnavbar = () => {
  const { Authuser, isDarkMode,logout } = userAuthStore();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();


  function handleLogout() {
    console.log("logout");
    logout();
    navigate("/");
  }

  return (
    <div className={`flex justify-between items-center mt-2 ml-2 ${isDarkMode ? "text-white" : "text-black"}`}>
      {/* Search Bar */}
      <div className={`flex items-center gap-2 rounded-full p-3 border-2 w-64 ${
        isDarkMode ? "bg-gray-900 border-gray-700" : "bg-[#e4e4e4] border-gray-300"
      }`}>
        <Search className={isDarkMode ? "text-white" : "text-black"} />
        <input
          className={`border-none outline-none bg-transparent ${
            isDarkMode ? "text-white placeholder-gray-400" : "text-black placeholder-gray-500"
          }`}
          type="text"
          placeholder="Search..."
        />
      </div>

      {/* User Workspace */}
      {/* {Authuser && (
        <>
          <div className={`text-2xl font-bold font-poppins rounded-full p-2 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-[#e4e4e4] text-black"
          }`}>
            <h2>{Authuser.fullname}'s Workspace</h2>
          </div>
          <div className={`text-2xl font-bold font-poppins rounded-full p-2 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-[#e4e4e4] text-black"
          }`}>
            <img
              src={Authuser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt="avatar"
              className="size-8 rounded-full border-2 border-gray-300"
            />
          </div>
        </>
      )} */}

      {/* Profile Dropdown */}
      <div className={`relative flex items-center justify-between gap-2 rounded-full p-2 w-52 mr-2 border-2 ${
        isDarkMode ? "bg-gray-900 border-gray-700" : "bg-[#e4e4e4] border-gray-300"
      }`}>
        <img
          className="size-8 rounded-full border-2 border-gray-300"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profile"
        />
        <h2 className="font-jost">{Authuser.newUser.user}</h2>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle dropdown"
        >
          {open ? (
            <ChevronUp className={isDarkMode ? "text-white" : "text-black"} />
          ) : (
            <ChevronDown className={isDarkMode ? "text-white" : "text-black"} />
          )}
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className={`absolute right-0 shadow-md rounded-xl w-52 p-2 mr-2 border-2 top-12 ${
            isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-[#e4e4e4] border-gray-300 text-black"
          }`}>
            <Link to="/profile">
              <h2 className="flex flex-row justify-between border-b-2 border-gray-300 pb-2 hover:bg-gray-800 dark:hover:bg-gray-800 p-1 rounded">
                Profile <User className="size-5 my-auto" />
              </h2>
            </Link>
            <Link to="/settings">
              <h2 className="flex flex-row justify-between border-b-2 border-gray-300 pb-2 hover:bg-gray-800 dark:hover:bg-gray-800 p-1 rounded">
                Settings <Settings className="size-5 my-auto" />
              </h2>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex flex-row justify-between hover:bg-gray-8 00 dark:hover:bg-gray-800 p-1 rounded"
            >
              Logout <LogOut className="size-5 my-auto" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hnavbar;