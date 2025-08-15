import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import Layout from "./Layout"; // Adjust if needed
import { userAuthStore } from "../../store/userAuthStore";
import { axiosInstance } from "../../lib/axios.jsx";
import toast from "react-hot-toast";

const Instagram = () => {
  const { isDarkMode, Authuser } = userAuthStore();
  const [socialLinks, setSocialLinks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    tags: ''
  });

  // Fetch social links
  const loadSocialLinks = async () => {
    try {
      const res = await axiosInstance.get('/api/v1/social-links');
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

  // Only show Instagram links
  const instaCards = socialLinks.filter(
    (item) => item.platform === 'instagram'
  );

  const isVideo = (link) => link.includes("/reel/") || link.includes("/p/");

  const handleAddInstagram = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const socialLinkData = {
        platform: 'instagram',
        url: formData.url,
        title: formData.title,
        description: formData.description,
        tags: tagsArray
      };
      
      await axiosInstance.post('/api/v1/social-links', socialLinkData);
      toast.success('Instagram link added successfully!');
      setShowAddForm(false);
      setFormData({ title: '', description: '', url: '', tags: '' });
      loadSocialLinks();
    } catch (error) {
      console.error('Error adding Instagram link:', error);
      toast.error('Failed to add Instagram link');
    }
  };

  const handleDeleteInstagram = async (id) => {
    if (window.confirm('Are you sure you want to delete this Instagram link?')) {
      try {
        await axiosInstance.delete(`/api/v1/social-links/${id}`);
        toast.success('Instagram link deleted successfully!');
        loadSocialLinks();
      } catch (error) {
        console.error('Error deleting Instagram link:', error);
        toast.error('Failed to delete Instagram link');
      }
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Instagram</h1>
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
            Add Instagram Link
          </button>
        )}
      </div>

      {/* Add Instagram Form */}
      {showAddForm && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
          <div className={`w-full max-w-md p-6 rounded-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}>
            <h2 className="text-xl font-bold mb-4">Add Instagram Link</h2>
            <form onSubmit={handleAddInstagram} className="space-y-4">
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
                <label className="block text-sm font-medium mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="https://www.instagram.com/p/..."
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
                  placeholder="instagram, lifestyle, photography"
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
                  Add Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
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

      {/* Instagram Cards */}
      {instaCards.length === 0 ? (
        <div className={`text-center py-12 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          <p className="text-lg mb-2">You haven't saved any Instagram links yet.</p>
          {Authuser && (
            <button
              onClick={() => setShowAddForm(true)}
              className={`px-4 py-2 rounded-lg font-medium ${
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Add Your First Instagram Link
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instaCards.map((card, index) => (
          <div
            key={index}
            className={`${
              isDarkMode
                ? "bg-[#1E2939] text-white"
                : "bg-white border border-gray-200 text-[#101828]"
            } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
          >
            {isVideo(card.url) ? (
              <iframe
                src={`${card.url}/embed`}
                width="100%"
                height="480"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={card.image || "https://via.placeholder.com/300"}
                alt={card.title || "Instagram Content"}
                className="w-full h-48 object-cover"
              />
            )}
            <hr />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {card.title || "Untitled Instagram Post"}
              </h2>
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {card.description || "No description available."}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View on Instagram
                </a>
                {Authuser && (
                  <button
                    onClick={() => handleDeleteInstagram(card._id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                      isDarkMode 
                        ? "bg-red-600 text-white hover:bg-red-700" 
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
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

export default Instagram;
