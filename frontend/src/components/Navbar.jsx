import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="box-border w-1/4 bg-blue-600 h-screen flex flex-col p-3">
        <h2 className="text-black text-2xl font-bold font-poppins">
          Prime <span className="text-red-500">Brain</span>
        </h2>
        <div className="box-border font-medium text-xl justify-center pl-5 p-5">
            <Link to="/tweets"><h2 className="box-border p-4">Tweets</h2></Link>
            <Link to="/videos"><h2 className="box-border p-4">Videos</h2></Link>
            <Link to="/documents"><h2 className="box-border p-4">Documents</h2></Link>
            <Link to="/links"><h2 className="box-border p-4">Links</h2></Link>
            <Link to="/tags"><h2 className="box-border p-4">Tags</h2></Link>
            
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
