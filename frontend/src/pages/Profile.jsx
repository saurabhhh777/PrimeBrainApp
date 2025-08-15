import React, { useState, useEffect } from "react";
import Layout from "./Layout"; // or wherever your Layout is
import { userAuthStore } from "../../store/userAuthStore";
import { Github, Linkedin, Globe, Twitter } from "lucide-react";
import { axiosInstance } from "../../lib/axios.jsx";
// Add more icons as needed

const Profile = () => {
  const { isDarkMode, Authuser } = userAuthStore();

  // Sample user data—pull from your store or backend in real app
  const [user, setUser] = useState({
    name: "Saurabh (Bunny) Maurya",
    title: "Full Stack Web3 Developer",
    bio: "Passionate about coding, innovation, and technology. Building the future of the web!",
    avatarUrl:
      "https://res.cloudinary.com/dongxnnnp/image/upload/v1742702488/Profile/vkdtsgvzg1n4uryaqbqk.jpg",
    // Instead of single github/linkedin, let’s store all social links in an array
    socialLinks: [
      { url: "https://github.com/saurabhhh777" },
      { url: "https://www.linkedin.com/in/saurabh-maurya-92b727245/" },
    ],
  });

  // Internal edit state
  const [isEditing, setIsEditing] = useState(false);

  // Real stats data
  const [stats, setStats] = useState({
    posts: 0,
    projects: 0,
    following: 0,
    followers: 0
  });

  // We copy the user data for editing
  const [editData, setEditData] = useState({ ...user });

  // For adding new social media links
  const [newLink, setNewLink] = useState("");

  // Toggle between view/edit
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel -> revert changes
      setEditData({ ...user });
      setNewLink("");
    }
    setIsEditing((prev) => !prev);
  };

  // On input change (name, title, bio)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new social link
  const handleAddLink = () => {
    const trimmed = newLink.trim();
    if (!trimmed) return;

    setEditData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { url: trimmed }],
    }));
    setNewLink("");
  };

  // Remove an existing link
  const handleRemoveLink = (index) => {
    setEditData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  // Save changes
  const handleSave = () => {
    // In a real app, persist changes to backend or store
    setUser({ ...editData });
    setIsEditing(false);
  };

  // Fetch real stats data
  useEffect(() => {
    if (Authuser) {
      fetchUserStats();
    }
  }, [Authuser]);

  const fetchUserStats = async () => {
    try {
      // Fetch content counts from different endpoints
      const [contentRes, blogRes] = await Promise.all([
        axiosInstance.get('/api/v1/content/'),
        axiosInstance.get('/api/v1/blog/user/blogs')
      ]);

      const content = contentRes.data || [];
      const blogs = blogRes.data?.blogs || [];

      // Count total posts (content + blogs)
      const totalPosts = content.length + blogs.length;

      setStats({
        posts: totalPosts,
        projects: blogs.length, // Using blogs as projects for now
        following: 150, // This would come from a followers/following system
        followers: 340  // This would come from a followers/following system
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  /**
   * Detects which platform an URL belongs to for icon usage:
   * e.g. "github.com" => GitHub icon, "linkedin.com" => LinkedIn icon, etc.
   */
  const detectPlatform = (url) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes("github.com")) return "github";
    if (lowerUrl.includes("linkedin.com")) return "linkedin";
    if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be"))
      return "youtube";
    if (lowerUrl.includes("x.com") || lowerUrl.includes("twitter.com"))
      return "x";
    if (lowerUrl.includes("reddit.com")) return "reddit";
    // ... add more if needed
    return "other";
  };

  // Return an icon component based on detected platform
  const renderIcon = (platform) => {
    switch (platform) {
      case "github":
        return <Github />;
      case "linkedin":
        return <Linkedin />;
      case "x":
        // If you want the official Twitter icon, you can import an appropriate icon. 
        // For demonstration, we reuse the "Twitter" from lucide-react:
        return <Twitter />;
      default:
        // “Globe” for everything else
        return <Globe />;
    }
  };

  return (
    <Layout>
      <div
        className={`min-h-screen px-4 py-10 ${
          isDarkMode ? "bg-[#1E2939]" : "bg-white"
        }`}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className={`relative rounded-lg p-6 shadow-md ${
              isDarkMode
                ? "bg-[#2E3B4E] text-white"
                : "bg-white border border-gray-200 text-[#101828]"
            }`}
          >
            {/* Edit button */}
            <button
              onClick={handleEditToggle}
              className={`absolute top-4 right-4 px-3 py-1 text-sm rounded ${
                isDarkMode
                  ? "bg-[#1E2939] text-white hover:bg-[#32445f]"
                  : "bg-gray-200 text-[#101828] hover:bg-gray-300"
              }`}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>

            {/* Avatar + Name/Title */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="object-cover w-full h-full"
                />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  className={`text-xl font-bold w-auto text-center mb-1 ${
                    isDarkMode
                      ? "bg-[#2E3B4E] text-white border-b border-gray-400"
                      : "bg-white text-[#101828] border-b border-gray-600"
                  }`}
                  value={editData.name}
                  onChange={handleChange}
                />
              ) : (
                <h1 className="text-2xl font-bold">{user.name}</h1>
              )}

              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  className={`text-sm text-gray-400 text-center ${
                    isDarkMode
                      ? "bg-[#2E3B4E] text-white border-b border-gray-400"
                      : "bg-white text-gray-700 border-b border-gray-600"
                  }`}
                  value={editData.title}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-sm text-gray-400">
                  {user.title || "Your Title Here"}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="text-center">
              {isEditing ? (
                <textarea
                  name="bio"
                  className={`mb-4 w-full text-center px-2 py-1 rounded ${
                    isDarkMode
                      ? "bg-[#2E3B4E] text-white border border-gray-400"
                      : "bg-white text-[#101828] border border-gray-300"
                  }`}
                  rows={3}
                  value={editData.bio}
                  onChange={handleChange}
                />
              ) : (
                <p className="mb-4">
                  {user.bio ||
                    "Add a brief bio, summary of your work, interests, or accomplishments."}
                </p>
              )}
            </div>

            {/* Social media links */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Social Links</h3>

              {/* If editing, show the link input */}
              {isEditing && (
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add a social link"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    className={`flex-1 px-2 py-1 rounded ${
                      isDarkMode
                        ? "bg-[#2E3B4E] text-white border border-gray-400"
                        : "bg-white text-[#101828] border border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className={`px-3 py-1 rounded ${
                      isDarkMode
                        ? "bg-green-600 text-white hover:bg-green-500"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {isEditing
                  ? editData.socialLinks.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {renderIcon(detectPlatform(item.url))}
                          <input
                            type="text"
                            value={item.url}
                            onChange={(e) => {
                              const newUrl = e.target.value;
                              setEditData((prev) => {
                                const updated = [...prev.socialLinks];
                                updated[idx] = { url: newUrl };
                                return { ...prev, socialLinks: updated };
                              });
                            }}
                            className={`flex-1 px-2 py-1 rounded ${
                              isDarkMode
                                ? "bg-[#2E3B4E] text-white border-b border-gray-400"
                                : "bg-white text-[#101828] border-b border-gray-600"
                            }`}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(idx)}
                          className={`px-3 py-1 rounded ${
                            isDarkMode
                              ? "bg-red-600 text-white hover:bg-red-500"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  : user.socialLinks.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {renderIcon(detectPlatform(item.url))}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {item.url}
                        </a>
                      </div>
                    ))}
              </div>
            </div>

            {/* Save button only if editing */}
            {isEditing && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSave}
                  className={`px-4 py-2 rounded ${
                    isDarkMode
                      ? "bg-green-600 text-white hover:bg-green-500"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Additional sections: stats, recent activity, etc. */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`rounded-lg p-4 shadow-md ${
                isDarkMode
                  ? "bg-[#2E3B4E] text-white"
                  : "bg-white border border-gray-200 text-[#101828]"
              }`}
            >
              <h2 className="font-semibold text-lg mb-2">Stats</h2>
              <ul className="space-y-1 text-sm">
                <li>Posts: {stats.posts}</li>
                <li>Projects: {stats.projects}</li>
                <li>Following: {stats.following}</li>
                <li>Followers: {stats.followers}</li>
              </ul>
            </div>
            <div
              className={`rounded-lg p-4 shadow-md ${
                isDarkMode
                  ? "bg-[#2E3B4E] text-white"
                  : "bg-white border border-gray-200 text-[#101828]"
              }`}
            >
              <h2 className="font-semibold text-lg mb-2">Recent Activity</h2>
              <p className="text-sm">
                Showcase your recent posts, articles, or any dynamic info you
                want.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
