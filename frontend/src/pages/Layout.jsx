import React from 'react';
import Navbar from '../NavbarPage/Navbar.jsx';
import Hnavbar from '../NavbarPage/Hnavbar.jsx';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="fixed left-0 h-screen">
        <Navbar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 ml-64"> {/* ml-64 matches navbar width */}
        {/* Top Navbar */}
        <div className="fixed top-0 right-0 left-64 bg-white z-10">
          <Hnavbar />
        </div>
        
        {/* Main Content */}
        <div className="mt-24 p-6"> {/* Adjust mt-24 based on your Hnavbar height */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;