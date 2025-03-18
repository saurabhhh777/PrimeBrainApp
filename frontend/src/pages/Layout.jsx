import React from "react";
import Hnavbar from "../NavbarPage/Hnavbar";
import Navbar from "../NavbarPage/Navbar";
import Footer from "./Footer";
import { userAuthStore } from "../../store/userAuthStore";

const Layout = ({ children }) => {
  // Example: using isDarkMode from your store
  const { isDarkMode } = userAuthStore();

  return (
    <div
      className={`flex flex-col h-screen ${
        isDarkMode ? "bg-[#1E2939] text-white" : "bg-[#FFFFFF] text-[#101828]"
      }`}
    >
      {/* Top Navbar (fixed) */}
      <header
        className={`fixed top-0 left-0 right-0 h-16 z-50 ${
          isDarkMode ? "bg-[#1E2939]" : "bg-white"
        }`}
      >
        <Hnavbar />
      </header>

      {/* Main Container: pushes content down by 4rem (h-16) */}
      <div className="flex flex-1 pt-16">
        {/* Left Sidebar (fixed) */}
        <aside
          className={`fixed left-0 top-16 bottom-0 w-64 ${
            isDarkMode ? "bg-[#1E2939]" : "bg-white"
          }`}
        >
          <Navbar />
        </aside>

        {/* Main Content Area (offset by the width of the sidebar) */}
        <main
          className={`flex-1 ml-64 overflow-y-auto p-6 ${
            isDarkMode ? "bg-[#101828]" : "bg-white"
          }`}
        >
          {/* children is everything passed from Content.jsx (or any other page) */}
          {children}
        </main>
      </div>

      {/* Footer (optional fixed or static) */}
      {/* If you want a *fixed* footer, you can do `fixed bottom-0 left-0 right-0 h-16 z-50` and offset the main content bottom. */}
      <footer className="pt-5">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
