import React, { useState, useEffect } from "react";
import Hnavbar from "../NavbarPage/Hnavbar";
import Navbar from "../NavbarPage/Navbar";
import { userAuthStore } from "../../store/userAuthStore";
import UserStats from "../components/UserStats";
import ContentChart from "../components/ContentChart";
import { axiosInstance } from "../../lib/axios.jsx";
import { RefreshCw } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const Dashboard = () => {
  const { isDarkMode, Authuser, checkAuth } = userAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    videos: 0,
    articles: 0,
    tweets: 0,
    instagram: 0,
    reddits: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Authuser) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [Authuser]);

  // Check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!Authuser && !loading) {
      navigate('/signin');
    }
  }, [Authuser, loading, navigate]);

  // Refresh data every 30 seconds to keep it updated
  useEffect(() => {
    if (Authuser) {
      const interval = setInterval(() => {
        fetchDashboardData();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [Authuser]);

  const fetchDashboardData = async () => {
    console.log('fetchDashboardData called');
    setLoading(true);
    try {
      console.log('Making API calls...');
      
      // Check if user is authenticated first
      if (!Authuser) {
        console.log('User not authenticated, skipping API calls');
        setLoading(false);
        return;
      }

      // For now, let's just fetch social links since we know tweets work
      console.log('Fetching social links data...');
      
      const socialLinksRes = await axiosInstance.get('/api/v1/social-links/user');
      console.log('Social Links API response:', socialLinksRes);

      const content = []; // Empty for now
      const blogs = []; // Empty for now
      const socialLinks = socialLinksRes.data?.links || [];

      // Count by platform for social links
      const socialStats = socialLinks.reduce((acc, item) => {
        const platform = item.platform?.toLowerCase();
        if (platform) {
          acc[platform] = (acc[platform] || 0) + 1;
        }
        return acc;
      }, {});

      console.log('Social links data:', socialLinks);
      console.log('Social stats:', socialStats);

      const newStats = {
        videos: 0, // No content for now
        articles: 0, // No blogs for now
        tweets: socialStats.twitter || 0,
        instagram: socialStats.instagram || 0,
        reddits: socialStats.reddit || 0
      };

      console.log('Dashboard - Social Stats:', socialStats);
      console.log('Dashboard - Final Stats:', newStats);
      console.log('Dashboard - Social Links:', socialLinks);

      setStats(newStats);
      console.log('Stats updated successfully');
      toast.success('Dashboard data refreshed successfully!');

      // Create recent activity from all sources
      const allActivity = [
        ...content.map(item => ({
          title: item.title,
          type: item.type,
          date: item.createdAt,
          status: 'Published',
          id: item._id
        })),
        ...socialLinks.map(item => ({
          title: item.title,
          type: item.platform,
          date: item.createdAt,
          status: 'Published',
          id: item._id
        }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

      setRecentActivity(allActivity);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      
      if (error.response?.status === 401) {
        toast.error('Authentication required. Please log in again.');
        console.log('Authentication error - user needs to log in again');
        // Try to refresh authentication
        await checkAuth();
        // If still not authenticated, redirect to login
        setTimeout(() => {
          if (!Authuser) {
            navigate('/signin');
          }
        }, 2000);
      } else if (error.response?.status === 404) {
        toast.error('API endpoint not found. Please check server configuration.');
        console.log('404 error - endpoint not found');
      } else {
        toast.error('Failed to refresh dashboard data');
      }
    } finally {
      setLoading(false);
      console.log('fetchDashboardData completed');
    }
  };

  return (
    <>
      <Toaster />
      <div
        className={`flex flex-col min-h-screen ${
          isDarkMode ? "bg-[#1E2939] text-white" : "bg-white text-black"
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
          {/* Welcome / Heading */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
              <p className="text-sm text-gray-400">
                Here you can manage your content, view stats, and check recent activity.
              </p>
            </div>
            <button
              onClick={async () => {
                console.log('Refresh button clicked');
                console.log('Current Authuser:', Authuser);
                await checkAuth();
                fetchDashboardData();
              }}
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50" 
                  : "bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              }`}
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Real User Stats */}
          <UserStats externalStats={stats} externalLoading={loading} />

          {/* Content Charts */}
          <ContentChart stats={stats} />

          {/* Recent Activity */}
          <Card className={`mt-6 ${isDarkMode ? "bg-[#2E3B4E] text-white border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
              <CardDescription>
                Latest content updates and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-gray-400">Loading recent activity...</p>
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No recent activity found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-2 text-left font-medium">Title</th>
                        <th className="py-2 text-left font-medium">Type</th>
                        <th className="py-2 text-left font-medium">Date</th>
                        <th className="py-2 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                                          {recentActivity.map((activity, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-[1.01] cursor-pointer group">
                        <td className="py-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{activity.title || 'Untitled'}</td>
                        <td className="py-3 capitalize">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 group-hover:scale-110 ${
                            activity.type === 'twitter' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 group-hover:bg-blue-200 dark:group-hover:bg-blue-800' :
                            activity.type === 'reddit' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 group-hover:bg-orange-200 dark:group-hover:bg-orange-800' :
                            activity.type === 'instagram' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 group-hover:bg-pink-200 dark:group-hover:bg-pink-800' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 group-hover:bg-gray-200 dark:group-hover:bg-gray-800'
                          }`}>
                            {activity.type}
                          </span>
                        </td>
                        <td className="py-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {activity.date ? new Date(activity.date).toLocaleDateString() : 'Unknown'}
                        </td>
                        <td className="py-3">
                          <span className="text-green-500 font-semibold flex items-center gap-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-125 transition-transform"></div>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
