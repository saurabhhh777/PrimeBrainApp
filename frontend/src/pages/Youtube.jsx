import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react"; // Import icons
import Layout from "./Layout";
import { userAuthStore } from "../../store/userAuthStore";
import { axiosInstance } from "../../lib/axios.jsx";
import toast from "react-hot-toast";

const Youtube = () => {
  const { isDarkMode, Authuser } = userAuthStore();
  const [socialLinks, setSocialLinks] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    url: "",
    tags: []
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    tags: ''
  });

  // Fetch social links
  const loadSocialLinks = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSocialLinks();
  }, []);

  // Only show YouTube links
  const youtubeCards = socialLinks.filter(
    (item) => item.platform === 'youtube'
  );

  // Handle edit button click
  const handleEditClick = (card) => {
    setEditingCard(card._id); // Assuming each card has an _id field
    setEditFormData({
      title: card.title,
      description: card.description,
      url: card.url,
      tags: card.tags ? card.tags.map(tag => tag.title || tag) : []
    });
  };

  // Handle form input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle tag changes
  const handleTagChange = (e, index) => {
    const newTags = [...editFormData.tags];
    newTags[index] = e.target.value;
    setEditFormData(prev => ({ ...prev, tags: newTags }));
  };

  // Handle form submission
  const handleEditSubmit = async (cardId) => {
    try {
      const tagsArray = editFormData.tags.filter(tag => tag.trim());
      const socialLinkData = {
        platform: 'youtube',
        url: editFormData.url,
        title: editFormData.title,
        description: editFormData.description,
        tags: tagsArray
      };
      
      await axiosInstance.put(`/api/v1/social-links/${cardId}`, socialLinkData);
      toast.success("Video updated successfully");
      setEditingCard(null);
      loadSocialLinks(); // Refresh the list
    } catch (error) {
      toast.error("Failed to update video");
      console.error("Error updating content:", error);
    }
  };

  // Handle delete
  const handleDelete = async (cardId) => {
    try {
      await axiosInstance.delete(`/api/v1/social-links/${cardId}`);
      toast.success("Video deleted successfully");
      loadSocialLinks(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete video");
      console.error("Error deleting content:", error);
    }
  };

  const handleAddYouTube = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const socialLinkData = {
        platform: 'youtube',
        url: formData.url,
        title: formData.title,
        description: formData.description,
        tags: tagsArray
      };
      
      await axiosInstance.post('/api/v1/social-links', socialLinkData);
      toast.success('YouTube video added successfully!');
      setShowAddForm(false);
      setFormData({ title: '', description: '', url: '', tags: '' });
      loadSocialLinks();
    } catch (error) {
      console.error('Error adding YouTube video:', error);
      toast.error('Failed to add YouTube video');
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">YouTube Videos</h1>
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
            Add YouTube Video
          </button>
        )}
      </div>

      {/* Add YouTube Form */}
      {showAddForm && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
          <div className={`w-full max-w-md p-6 rounded-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}>
            <h2 className="text-xl font-bold mb-4">Add YouTube Video</h2>
            <form onSubmit={handleAddYouTube} className="space-y-4">
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
                <label className="block text-sm font-medium mb-2">YouTube URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="https://www.youtube.com/watch?v=..."
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
                  placeholder="youtube, tutorial, programming"
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
                  Add Video
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

      {/* Loading State */}
      {loading ? (
        <div className={`text-center py-12 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading YouTube videos...</p>
        </div>
      ) : youtubeCards.length === 0 ? (
        <div className={`text-center py-12 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          <p className="text-lg mb-2">You haven't saved any YouTube videos yet.</p>
          {Authuser && (
            <button
              onClick={() => setShowAddForm(true)}
              className={`px-4 py-2 rounded-lg font-medium ${
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Add Your First YouTube Video
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeCards.map((card) => (
          <div
            key={card._id}
            className={`${
              isDarkMode
                ? "bg-[#1E2939] text-white"
                : "bg-white border border-gray-200 text-[#101828]"
            } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
          >
            {/* Video Embed */}
            <div className="w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${
                  card.url.includes("v=")
                    ? card.url.split("v=")[1].split("&")[0]
                    : card.url.includes("youtu.be/")
                    ? card.url.split("youtu.be/")[1].split("?")[0]
                    : card.url.split("/").pop()
                }`}
                title={card.title}
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Edit Form or Card Content */}
            {editingCard === card._id ? (
              <div className="p-4">
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className={`w-full p-2 mb-2 rounded ${
                    isDarkMode ? "bg-[#1E2939]" : "bg-gray-100"
                  }`}
                />
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  className={`w-full p-2 mb-2 rounded ${
                    isDarkMode ? "bg-[#1E2939]" : "bg-gray-100"
                  }`}
                  rows="3"
                />
                <div className="mb-2">
                  {editFormData.tags.map((tag, index) => (
                    <input
                      key={index}
                      value={tag}
                      onChange={(e) => handleTagChange(e, index)}
                      className={`p-1 mb-1 rounded ${
                        isDarkMode ? "bg-[#1E2939]" : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingCard(null)}
                    className="px-3 py-1 rounded bg-gray-500 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditSubmit(card._id)}
                    className="px-3 py-1 rounded bg-blue-500 text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(card)}
                      className="p-1 text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(card._id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-3`}>
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {card.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs ${
                        isDarkMode
                          ? "bg-[#1E2939] text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Watch on YouTube
                </a>
              </div>
            )}
          </div>
        ))}
        </div>
      )}
    </Layout>
  );
};

export default Youtube;