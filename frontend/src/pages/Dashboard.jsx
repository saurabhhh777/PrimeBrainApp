import React from "react";
import Hnavbar from "../NavbarPage/Hnavbar";
import Navbar from "../NavbarPage/Navbar";
import { userAuthStore } from "../../store/userAuthStore";

const Dashboard = () => {
  const { isDarkMode } = userAuthStore();

  return (
    <div className={isDarkMode ? "bg-[#1E2939] text-white" : "bg-white text-black"}>
      {/* Horizontal Nav at the top */}
      <Hnavbar />

      {/* Container with side navbar and main dashboard content */}
      <div className="flex min-h-screen">
        {/* Side Nav */}
        <div className="hidden sm:block">
          <Navbar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Welcome / Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
            <p className="text-sm text-gray-400">
              Here you can manage your content, view stats, and check recent activity.
            </p>
          </div>

          {/* Stats / Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {/* Videos */}
            <div
              className={`rounded-lg p-4 shadow-md ${
                isDarkMode
                  ? "bg-[#2E3B4E] text-white"
                  : "bg-white border border-gray-200 text-black"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">Videos</h2>
              <p className="text-3xl font-bold">15</p>
              <p className="text-sm text-gray-400 mt-1">+2 this week</p>
            </div>

            {/* Articles */}
            <div
              className={`rounded-lg p-4 shadow-md ${
                isDarkMode
                  ? "bg-[#2E3B4E] text-white"
                  : "bg-white border border-gray-200 text-black"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">Articles</h2>
              <p className="text-3xl font-bold">10</p>
              <p className="text-sm text-gray-400 mt-1">+1 this week</p>
            </div>

            {/* Tweets */}
            <div
              className={`rounded-lg p-4 shadow-md ${
                isDarkMode
                  ? "bg-[#2E3B4E] text-white"
                  : "bg-white border border-gray-200 text-black"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">Tweets</h2>
              <p className="text-3xl font-bold">20</p>
              <p className="text-sm text-gray-400 mt-1">+3 this week</p>
            </div>

            {/* Instagram */}
            <div
              className={`rounded-lg p-4 shadow-md ${
                isDarkMode
                  ? "bg-[#2E3B4E] text-white"
                  : "bg-white border border-gray-200 text-black"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">Instagram</h2>
              <p className="text-3xl font-bold">8</p>
              <p className="text-sm text-gray-400 mt-1">+1 this week</p>
            </div>

            {/* Reddit */}
            <div
              className={`rounded-lg p-4 shadow-md ${
                isDarkMode
                  ? "bg-[#2E3B4E] text-white"
                  : "bg-white border border-gray-200 text-black"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">Reddits</h2>
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-gray-400 mt-1">No change</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className={`rounded-lg p-4 shadow-md ${
              isDarkMode
                ? "bg-[#2E3B4E] text-white"
                : "bg-white border border-gray-200 text-black"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {/* A small table or list to show latest content, logs, or updates */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Title</th>
                    <th className="py-2 text-left">Type</th>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-2">My First Video</td>
                    <td className="py-2">Video</td>
                    <td className="py-2">2025-09-15</td>
                    <td className="py-2 text-green-500 font-semibold">Published</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-2">React Tutorial Article</td>
                    <td className="py-2">Article</td>
                    <td className="py-2">2025-09-10</td>
                    <td className="py-2 text-yellow-500 font-semibold">Draft</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-2">@saurabh Tweet</td>
                    <td className="py-2">Tweet</td>
                    <td className="py-2">2025-09-08</td>
                    <td className="py-2 text-green-500 font-semibold">Published</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-2">Insta Post #3</td>
                    <td className="py-2">Instagram</td>
                    <td className="py-2">2025-09-05</td>
                    <td className="py-2 text-red-500 font-semibold">Archived</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-2">r/ReactJS Post</td>
                    <td className="py-2">Reddit</td>
                    <td className="py-2">2025-09-02</td>
                    <td className="py-2 text-green-500 font-semibold">Published</td>
                  </tr>
                  {/* Add more rows dynamically from your data */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
