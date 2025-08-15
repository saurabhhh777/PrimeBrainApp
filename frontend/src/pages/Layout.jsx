import React from "react";
import Hnavbar from "../NavbarPage/Hnavbar";
import Navbar from "../NavbarPage/Navbar";
import Footer from "./Footer";
import { userAuthStore } from "../../store/userAuthStore";

const Layout = ({ children }) => {
  const { isDarkMode } = userAuthStore();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-[#1E2939] text-white" : "bg-[#FFFFFF] text-[#101828]"
      }`}
    >
      {/* Top Navbar (fixed) */}
      <header
        className={`fixed top-0 left-0 right-0 h-16 z-50 shadow-md ${
          isDarkMode ? "bg-[#1E2939]" : "bg-white"
        }`}
      >
        <Hnavbar />
      </header>

      {/* Main Container (pushes content down by h-16) */}
      <div className="flex flex-1 pt-20">
        {/* Left Sidebar (fixed width) */}
        <aside
          className={`fixed left-0 top-16 bottom-0 w-72 pt-4 ${
            isDarkMode ? "bg-[#1E2939]" : "bg-white"
          }`}
        >
          <Navbar />
        </aside>

        {/* Main Content Area (offset by the sidebar width) */}
        <main
          className={`flex-1 ml-72 overflow-y-auto p-6 pt-8 rounded-tl-3xl shadow-lg ${
            isDarkMode ? "bg-[#101828]" : "bg-white"
          }`}
        >
          {children}
        </main>
      </div>

      {/* Footer (also offset by the sidebar width) */}
      <footer
        className={`ml-72 mt-auto ${
          isDarkMode ? "bg-[#101828]" : "bg-white"
        }`}
      >
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
