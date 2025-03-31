import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react"; // Import icons
import Layout from "./Layout";
import { userAuthStore } from "../../store/userAuthStore";
import toast from "react-hot-toast";

const Youtube = () => {
  const { getAllContent, isDarkMode, updateContent, deleteContent } = userAuthStore();
  const [allContent, setAllContent] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    link: "",
    tags: []
  });

  // Fetch content
  const loadContent = async () => {
    try {
      const res = await getAllContent();
      if (Array.isArray(res.data)) {
        setAllContent(res.data);
      } else if (res.data) {
        setAllContent([res.data]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Filter YouTube videos
  const youtubeCards = allContent.filter(
    (item) => item.link && (item.link.includes("youtube.com") || item.link.includes("youtu.be"))
  );

  // Handle edit button click
  const handleEditClick = (card) => {
    setEditingCard(card._id); // Assuming each card has an _id field
    setEditFormData({
      title: card.title,
      description: card.description,
      link: card.link,
      tags: [...card.tags]
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
      await updateContent(cardId, editFormData);
      toast.success("Video updated successfully");
      setEditingCard(null);
      loadContent(); // Refresh the list
    } catch (error) {
      toast.error("Failed to update video");
      console.error("Error updating content:", error);
    }
  };

  // Handle delete
  const handleDelete = async (cardId) => {
    try {
      await deleteContent(cardId);
      toast.success("Video deleted successfully");
      loadContent(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete video");
      console.error("Error deleting content:", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">YouTube Videos</h1>
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
                  card.link.includes("v=")
                    ? card.link.split("v=")[1].split("&")[0]
                    : card.link.split("/").pop()
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
                  href={card.link}
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
    </Layout>
  );
};

export default Youtube;