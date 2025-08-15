import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import Layout from "./Layout"; // Adjust path as needed
import { userAuthStore } from "../../store/userAuthStore";
import { axiosInstance } from "../../lib/axios.jsx";
import toast from "react-hot-toast";

const Tweets = () => {
  const { isDarkMode, Authuser } = userAuthStore();
  const [socialLinks, setSocialLinks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    tags: ''
  });
  const [editingTweet, setEditingTweet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch social links
  const loadSocialLinks = async () => {
    try {
      const res = await axiosInstance.get('/api/v1/social-links/user');
      console.log("Fetched social links:", res.data);

      if (res.data.success && res.data.links) {
        setSocialLinks(res.data.links);
      } else {
        setSocialLinks([]);
      }
    } catch (error) {
      console.error("Error fetching social links:", error);
      setSocialLinks([]);
    }
  };

  useEffect(() => {
    loadSocialLinks();
  }, []);

  // Only show Twitter/X links
  const tweetsData = socialLinks.filter(
    (item) => item.platform === 'twitter'
  );

  const handleAddTweet = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const socialLinkData = {
        platform: 'twitter',
        url: formData.url,
        title: formData.title,
        description: formData.description,
        tags: tagsArray
      };
      
      await axiosInstance.post('/api/v1/social-links', socialLinkData);
      toast.success('Tweet link added successfully!');
      setShowAddForm(false);
      setFormData({ title: '', description: '', url: '', tags: '' });
      loadSocialLinks();
    } catch (error) {
      console.error('Error adding tweet link:', error);
      toast.error('Failed to add tweet link');
    }
  };

  const handleEditTweet = (tweet) => {
    setEditingTweet(tweet);
    setFormData({
      title: tweet.title || '',
      description: tweet.description || '',
      url: tweet.url || '',
      tags: tweet.tags ? tweet.tags.map(tag => tag.title || tag).join(', ') : ''
    });
    setIsEditing(true);
    setShowAddForm(true);
  };

  const handleUpdateTweet = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const socialLinkData = {
        platform: 'twitter',
        url: formData.url,
        title: formData.title,
        description: formData.description,
        tags: tagsArray
      };
      
      await axiosInstance.post('/api/v1/social-links', socialLinkData);
      toast.success('Tweet link updated successfully!');
      setShowAddForm(false);
      setIsEditing(false);
      setEditingTweet(null);
      setFormData({ title: '', description: '', url: '', tags: '' });
      loadSocialLinks();
    } catch (error) {
      console.error('Error updating tweet link:', error);
      toast.error('Failed to update tweet link');
    }
  };

  const handleDeleteTweet = async (id) => {
    if (window.confirm('Are you sure you want to delete this tweet link?')) {
      try {
        await axiosInstance.delete(`/api/v1/social-links/${id}`);
        toast.success('Tweet link deleted successfully!');
        loadSocialLinks();
      } catch (error) {
        console.error('Error deleting tweet link:', error);
        toast.error('Failed to delete tweet link');
      }
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tweets / X Posts</h1>
        {Authuser && (
          <button
            onClick={() => setShowAddForm(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <Plus size={20} />
            Add Tweet Link
          </button>
        )}
      </div>

      {/* Add Tweet Form */}
      {showAddForm && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
          <div className={`w-full max-w-md p-6 rounded-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}>
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Tweet Link' : 'Add Tweet Link'}</h2>
            <form onSubmit={isEditing ? handleUpdateTweet : handleAddTweet} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tweet URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="https://x.com/username/status/..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="twitter, tech, programming"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg font-medium ${
                    isDarkMode 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isEditing ? 'Update Link' : 'Add Link'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setIsEditing(false);
                    setEditingTweet(null);
                    setFormData({ title: '', description: '', url: '', tags: '' });
                  }}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    isDarkMode 
                      ? "bg-gray-600 text-white hover:bg-gray-700" 
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tweet Cards */}
      {tweetsData.length === 0 ? (
        <div className={`text-center py-12 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          <p className="text-lg mb-2">You haven't saved any tweet links yet.</p>
          {Authuser && (
            <button
              onClick={() => setShowAddForm(true)}
              className={`px-4 py-2 rounded-lg font-medium ${
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Add Your First Tweet Link
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tweetsData.map((card, index) => (
          <div
            key={index}
            className={`${
              isDarkMode
                ? "bg-[#1E2939] text-white"
                : "bg-white border border-gray-200 text-[#101828]"
            } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
          >
            {/* Basic example of rendering an image or placeholder */}
            <img
              src="https://via.placeholder.com/300"
              alt={card.title || "Tweet/Content"}
              className="w-full h-48 object-cover"
            />

            <hr />

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {card.title || "Untitled"}
              </h2>
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {card.description || "No Description"}
              </p>
              {/* Optional date info */}
              <div
                className={`text-sm mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span>
                  {card.createdAt
                    ? card.createdAt.split("T")[0]
                    : "Unknown Date"}
                </span>{" "}
                |{" "}
                {card.updatedAt
                  ? card.updatedAt.split("T")[0]
                  : "Unknown Date"}
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {card.tags?.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`${
                      isDarkMode
                        ? "bg-[#2E3B4E] text-white"
                        : "bg-gray-200 text-gray-700"
                    } px-2 py-1 rounded-full text-sm`}
                  >
                    {tag.title || tag}
                  </span>
                ))}
              </div>
              {/* Link, Edit and Delete Buttons */}
              <div className="flex justify-between items-center mt-4">
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Tweet
                </a>
                {Authuser && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTweet(card)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                        isDarkMode 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTweet(card._id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                        isDarkMode 
                          ? "bg-red-600 text-white hover:bg-red-700" 
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </Layout>
  );
};

export default Tweets;
