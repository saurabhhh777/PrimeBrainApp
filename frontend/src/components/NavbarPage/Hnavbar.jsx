import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp,LogOut,User,Settings} from "lucide-react";
import { userAuthStore } from "../../../store/userAuthStore.jsx";
import { Link } from "react-router-dom";

const Hnavbar = () => {
  const { Authuser } = userAuthStore();
  const [open, setOpen] = useState(false);

  function handleLogout(){
    console.log("logout");
  }


  return (
    <div className="flex justify-between items-center mt-4 ml-2 ">
      <div className="flex items-center gap-2 bg-[#e4e4e4] rounded-full p-3 border-2 border-gray-300 w-64">
        <Search />
        <input className="border-none outline-none" type="text" placeholder="Search..." />
      </div>
      {Authuser && (
        <>
          <div className="text-2xl font-bold font-poppins bg-[#e4e4e4] rounded-full p-2">
            <h2>{Authuser.fullname}'s Workspace</h2>
          </div>
          <div className="text-2xl font-bold font-poppins bg-[#e4e4e4] rounded-full p-2">
            <img src={Authuser.avatar} alt="avatar" />
          </div>
        </>
      )}
      <div className="flex items-center gap-2 bg-[#e4e4e4] rounded-full p-2 w-52 mr-2 border-2 border-gray-300">
        <img
          className="size-8 rounded-full border-2 border-gray-300"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profile"
        />
        <h2 className="font-jost">Saurabh Maurya</h2>
        {open ? (
          <ChevronUp onClick={() => setOpen(!open)} />
        ) : (
          <ChevronDown onClick={() => setOpen(!open)} />
        )}
        {open && (
            <div className="absolute right-0 bg-[#e4e4e4]  shadow-md rounded-xl w-52 p-2 mr-2 border-2 border-gray-300 top-20 ">
                <Link to="/profile"><h2 className="flex flex-row justify-between border-b-2 border-gray-300 pb-2">Profile <User className="size-5 my-auto"/></h2></Link>
                <Link to="/settings"><h2 className="flex flex-row justify-between border-b-2 border-gray-300 pb-2">Settings <Settings className="size-5 my-auto"/></h2></Link>
                <h2 className="flex flex-row justify-between border-gray-300 pb-2">Logout <LogOut className="size-5 my-auto" onClick={()=> handleLogout()}/></h2>
            </div>
        )}
      </div>
    </div>
  );
};

export default Hnavbar;
