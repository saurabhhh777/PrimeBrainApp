import React, { useState, useEffect } from 'react';
import { userAuthStore } from '../../store/userAuthStore';
import { axiosInstance } from '../../lib/axios.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '../lib/utils';

const UserStats = ({ externalStats, externalLoading }) => {
  const { isDarkMode, Authuser } = userAuthStore();
  const [stats, setStats] = useState({
    videos: 0,
    articles: 0,
    tweets: 0,
    instagram: 0,
    reddits: 0
  });
  const [loading, setLoading] = useState(true);

  // Use external stats if provided, otherwise fetch internally
  const displayStats = externalStats || stats;
  const displayLoading = externalLoading !== undefined ? externalLoading : loading;

  useEffect(() => {
    if (Authuser && !externalStats) {
      fetchUserStats();
    } else {
      setLoading(false);
    }
  }, [Authuser, externalStats]);

  const fetchUserStats = async () => {
    try {
      // Fetch content counts from different endpoints
      const [contentRes, blogRes, socialLinksRes] = await Promise.all([
        axiosInstance.get('/api/v1/content/'),
        axiosInstance.get('/api/v1/blog/user/blogs'),
        axiosInstance.get('/api/v1/social-links/user')
      ]);

      const content = contentRes.data || [];
      const blogs = blogRes.data?.blogs || [];
      const socialLinks = socialLinksRes.data?.links || [];

      // Count by type for content
      const contentStats = content.reduce((acc, item) => {
        const type = item.type?.toLowerCase();
        if (type) {
          acc[type] = (acc[type] || 0) + 1;
        }
        return acc;
      }, {});

      // Count by platform for social links
      const socialStats = socialLinks.reduce((acc, item) => {
        const platform = item.platform?.toLowerCase();
        if (platform) {
          acc[platform] = (acc[platform] || 0) + 1;
        }
        return acc;
      }, {});

      setStats({
        videos: contentStats.video || 0,
        articles: contentStats.article || 0,
        tweets: socialStats.twitter || 0,
        instagram: socialStats.instagram || 0,
        reddits: socialStats.reddit || 0
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (displayLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`rounded-lg p-4 shadow-md animate-pulse ${
              isDarkMode
                ? "bg-[#2E3B4E]"
                : "bg-gray-200"
            }`}
          >
            <div className={`h-4 bg-gray-400 rounded mb-2 ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>
            <div className={`h-8 bg-gray-400 rounded ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      {/* Videos */}
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group",
        "border-l-4 border-l-transparent hover:border-l-red-500",
        isDarkMode ? "bg-[#2E3B4E] text-white border-gray-700" : "bg-white border-gray-200"
      )}>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Videos</CardTitle>
          <p className="text-3xl font-bold group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{displayStats.videos}</p>
          <CardDescription className="text-sm text-gray-400 mt-1 group-hover:text-red-500 transition-colors">
            {displayStats.videos > 0 ? "Your content" : "No videos yet"}
          </CardDescription>
        </CardContent>
      </Card>

      {/* Articles */}
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group",
        "border-l-4 border-l-transparent hover:border-l-blue-500",
        isDarkMode ? "bg-[#2E3B4E] text-white border-gray-700" : "bg-white border-gray-200"
      )}>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Articles</CardTitle>
          <p className="text-3xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{displayStats.articles}</p>
          <CardDescription className="text-sm text-gray-400 mt-1 group-hover:text-blue-500 transition-colors">
            {displayStats.articles > 0 ? "Your blogs" : "No articles yet"}
          </CardDescription>
        </CardContent>
      </Card>

      {/* Tweets */}
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group",
        "border-l-4 border-l-transparent hover:border-l-cyan-500",
        isDarkMode ? "bg-[#2E3B4E] text-white border-gray-700" : "bg-white border-gray-200"
      )}>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Tweets</CardTitle>
          <p className="text-3xl font-bold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{displayStats.tweets}</p>
          <CardDescription className="text-sm text-gray-400 mt-1 group-hover:text-cyan-500 transition-colors">
            {displayStats.tweets > 0 ? "Your tweets" : "No tweets yet"}
          </CardDescription>
        </CardContent>
      </Card>

      {/* Instagram */}
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group",
        "border-l-4 border-l-transparent hover:border-l-yellow-500",
        isDarkMode ? "bg-[#2E3B4E] text-white border-gray-700" : "bg-white border-gray-200"
      )}>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Instagram</CardTitle>
          <p className="text-3xl font-bold group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{displayStats.instagram}</p>
          <CardDescription className="text-sm text-gray-400 mt-1 group-hover:text-yellow-500 transition-colors">
            {displayStats.instagram > 0 ? "Your posts" : "No posts yet"}
          </CardDescription>
        </CardContent>
      </Card>

      {/* Reddit */}
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group",
        "border-l-4 border-l-transparent hover:border-l-purple-500",
        isDarkMode ? "bg-[#2E3B4E] text-white border-gray-700" : "bg-white border-gray-200"
      )}>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Reddits</CardTitle>
          <p className="text-3xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{displayStats.reddits}</p>
          <CardDescription className="text-sm text-gray-400 mt-1 group-hover:text-purple-500 transition-colors">
            {displayStats.reddits > 0 ? "Your posts" : "No posts yet"}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats; 