import React, { useState, useRef, useEffect } from "react";
import { MoveLeft } from "lucide-react";
import Layout from "./Layout";
import { userAuthStore } from "../../store/userAuthStore";
import toast, { Toaster } from "react-hot-toast";

const Article = () => {
  const { createContent, getAllContent, updateContent, isDarkMode } = userAuthStore();

  // Form state for new content (create mode).
  const [content, setContent] = useState({
    title: "",
    link: "",
    description: "",
    type: "",
    tags: [],
  });

  // State for the fetched content list.
  const [allContent, setAllContent] = useState([]);

  // Form state for editing an existing card
  const [editingCard, setEditingCard] = useState(null); // null means not editing

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const formRef = useRef(null);

  // Fetch and update content state.
  const loadContent = async () => {
    try {
      const res = await getAllContent();
      console.log("Frontend getAllContent response:", res.data);
      const contentData = res.data;
      if (Array.isArray(contentData)) {
        setAllContent(contentData);
      } else if (contentData) {
        setAllContent([contentData]);
      } else {
        setAllContent([]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // Load content on mount.
  useEffect(() => {
    loadContent();
  }, []);

  // ----------------------------
  // CREATE NEW CARD
  // ----------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !content.tags.includes(trimmedTag)) {
      setContent((prev) => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setContent((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddCard = async () => {
    try {
      const res = await createContent(content);
      if (!res) {
        toast.error("Card was not saved", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.success("Data saved");
      }
      await loadContent();
      setContent({
        title: "",
        link: "",
        description: "",
        type: "",
        tags: [],
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating content:", error);
    }
  };

  const handleCancel = () => {
    setContent({
      title: "",
      link: "",
      description: "",
      type: "",
      tags: [],
    });
    setIsFormOpen(false);
    toast("Cancelled !", {
      icon: "😔",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  // ----------------------------
  // EDIT AN EXISTING CARD
  // ----------------------------
  const handleEditClick = (card, contentIdFromDOM) => {
    console.log("Retrieved contentId:", contentIdFromDOM);
    // We can use "card.contentId" or the contentIdFromDOM from the DOM, either way
    setEditingCard({ ...card });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleEditAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !editingCard.tags.includes(trimmedTag)) {
      setEditingCard((prev) => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
      setTagInput("");
    }
  };

  const handleEditRemoveTag = (tagToRemove) => {
    setEditingCard((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const [contentID,setContentID] = useState('');


  const handleSaveEdit = async () => {
    try {
      // Here we call updateContent with editingCard.contentId
      console.log(`content ID from frontend which i send to the backend ${contentID}`);

      const res = await updateContent(contentID, editingCard);
      if (!res) {
        toast.error("Update failed", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.success("Card updated!");
      }
      await loadContent();
      setEditingCard(null); // close the edit modal
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleEditCancel = () => {
    setEditingCard(null);
    setTagInput("");
    toast("Edit cancelled", {
      icon: "😔",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  // Example: On card content click
  const handleGetByID = () => {
    // Define logic if needed
  };

  // Filter out only those cards that are type === "article"
  const articleCards = allContent.filter((card) => card.type === "article");

  return (
    <Layout>
      <Toaster />

      {/* Button to toggle "create new card" form */}
      <div className={`flex mb-6 ${isFormOpen ? "justify-between" : "justify-end"}`}>
        {isFormOpen && (
          <div className="z-50">
            <MoveLeft onClick={handleAddCard} />
          </div>
        )}
        <button
          onClick={() => setIsFormOpen((prev) => !prev)}
          className={`${
            isDarkMode
              ? "bg-[#1E2939] text-white"
              : "bg-[#E4E4E4] text-[#101828]"
          } py-2 px-4 rounded-md hover:bg-blue-600 ${isFormOpen ? "z-50" : ""}`}
        >
          Add Card
        </button>
      </div>

      {/* CREATE FORM (New card) */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div
            ref={formRef}
            className={`w-96 p-6 rounded-lg shadow-md ${
              isDarkMode ? "bg-[#1E2939]" : "bg-[#E4E4E4]"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Create New Card</h2>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={content.title}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "bg-[#1E2939] text-white"
                    : "bg-[#FFFFFF] text-[#101828]"
                }`}
                required
              />
            </div>
            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={content.description}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "bg-[#1E2939] text-white"
                    : "bg-[#FFFFFF] text-[#101828]"
                }`}
                required
              />
            </div>
            {/* URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">URL</label>
              <input
                type="url"
                name="link"
                value={content.link}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "bg-[#1E2939] text-white"
                    : "bg-[#FFFFFF] text-[#101828]"
                }`}
                required
              />
            </div>
            {/* Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="type"
                value={content.type}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "bg-[#1E2939] text-white"
                    : "bg-[#FFFFFF] text-[#101828]"
                }`}
                required
              >
                <option value="">Select Type</option>
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="post">Post</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Tags */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  className={`w-full p-2 border rounded-md ${
                    isDarkMode
                      ? "bg-[#1E2939] text-white"
                      : "bg-[#FFFFFF] text-[#101828]"
                  }`}
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className={`${
                    isDarkMode
                      ? "bg-[#1E2939] text-white"
                      : "bg-[#E4E4E4] text-[#101828]"
                  } py-2 px-4 rounded-md hover:bg-blue-600`}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {content.tags.map((tag, index) => (
                  <div
                    key={index}
                    className={`${
                      isDarkMode
                        ? "bg-[#1E2939] text-white"
                      : "bg-[#E4E4E4] text-[#101828]"
                    } px-2 py-1 rounded-md flex items-center gap-1`}
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAddCard}
                className={`flex-1 ${
                  isDarkMode
                    ? "bg-green-500 text-white"
                    : "bg-[#E4E4E4] text-[#101828]"
                } py-2 px-4 rounded-md hover:bg-green-600`}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className={`flex-1 ${
                  isDarkMode
                    ? "bg-red-700 text-white"
                    : "bg-[#E4E4E4] text-[#101828]"
                } py-2 px-4 rounded-md hover:bg-red-600`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT FORM (Existing card) */}
      {editingCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div
            className={`w-96 p-6 rounded-lg shadow-md ${
              isDarkMode ? "bg-[#1E2939]" : "bg-[#E4E4E4]"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Edit Card</h2>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={editingCard.title}
                onChange={handleEditChange}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "bg-[#1E2939] text-white"
                    : "bg-[#FFFFFF] text-[#101828]"
                }`}
                required
              />
            </div>
            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={editingCard.description}
                onChange={handleEditChange}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "bg-[#1E2939] text-white"
                    : "bg-[#FFFFFF] text-[#101828]"
                }`}
                required
              />
            </div>
            {/* URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">URL</label>
              <input
                type="url"
                name="link"
                value={editingCard.link}
                onChange={handleEditChange}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "bg-[#1E2939] text-white"
                    : "bg-[#FFFFFF] text-[#101828]"
                }`}
                required
              />
            </div>
            {/* Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="type"
                value={editingCard.type}
                onChange={handleEditChange}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "bg-[#1E2939] text-white"
                    : "bg-[#FFFFFF] text-[#101828]"
                }`}
                required
              >
                <option value="">Select Type</option>
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="post">Post</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Tags */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={handleEditTagInputChange}
                  className={`w-full p-2 border rounded-md ${
                    isDarkMode
                      ? "bg-[#1E2939] text-white"
                      : "bg-[#FFFFFF] text-[#101828]"
                  }`}
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={handleEditAddTag}
                  className={`${
                    isDarkMode
                      ? "bg-[#1E2939] text-white"
                      : "bg-[#E4E4E4] text-[#101828]"
                  } py-2 px-4 rounded-md hover:bg-blue-600`}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {editingCard.tags.map((tag, index) => (
                  <div
                    key={index}
                    className={`${
                      isDarkMode
                        ? "bg-[#1E2939] text-white"
                        : "bg-[#E4E4E4] text-[#101828]"
                    } px-2 py-1 rounded-md flex items-center gap-1`}
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleEditRemoveTag(tag)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className={`flex-1 ${
                  isDarkMode
                    ? "bg-green-500 text-white"
                    : "bg-[#E4E4E4] text-[#101828]"
                } py-2 px-4 rounded-md hover:bg-green-600`}
              >
                Save
              </button>
              <button
                onClick={handleEditCancel}
                className={`flex-1 ${
                  isDarkMode
                    ? "bg-red-700 text-white"
                    : "bg-[#E4E4E4] text-[#101828]"
                } py-2 px-4 rounded-md hover:bg-red-600`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render the "article" cards */}
      <h1 className="text-2xl font-bold mb-6">Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articleCards.map((card, index) => (
          <div
            key={index}
            data-contentid={card.contentId} // <---- using card.contentId here instead of card._id
            className={`${
              isDarkMode
                ? "bg-[#1E2939] text-white"
                : "bg-white border border-gray-200 text-[#101828]"
            } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
          >
            {/* If the URL is from YouTube, embed it */}
            {card.link.includes("youtube.com") || card.link.includes("youtu.be") ? (
              <div className="w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${
                    card.link.includes("v=")
                      ? card.link.split("v=")[1].split("&")[0]
                      : card.link.split("/").pop()
                  }`}
                  title={card.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              <img
                src="https://via.placeholder.com/300"
                alt={card.title}
                className="w-full h-48 object-cover"
              />
            )}

            <hr />

            {/* Card Content */}
            <div className="p-6 relative" onClick={handleGetByID}>
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600 mb-4">
                {card.description || "No Description"}
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span>
                  {card.createdAt ? card.createdAt.split("T")[0].trim() : "Unknown Date"}
                </span>{" "}
                |{" "}
                {card.updatedAt
                  ? card.updatedAt.split("T")[0].trim()
                  : "Unknown Date"}
              </div>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`${
                      isDarkMode
                        ? "bg-[#1E2939] text-white"
                        : "bg-gray-200 text-gray-700"
                    } px-2 py-1 rounded-full text-sm`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 hover:underline"
              >
                Visit Link
              </a>

              {/* Edit button in the corner */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent handleGetByID from firing

                  // Retrieve contentId from the parent element using DOM
                  const contentIdFromDOM = e.currentTarget
                    .closest("[data-contentid]")
                    ?.getAttribute("data-contentid");

                  console.log("Data contentId from DOM:", contentIdFromDOM);
                  setContentID(`${contentIdFromDOM}`);
                  handleEditClick(card, contentIdFromDOM);
                }}
                className={`absolute top-4 right-4 px-2 py-1 text-sm rounded ${
                  isDarkMode
                    ? "bg-[#32445f] text-white hover:bg-[#465b7c]"
                    : "bg-gray-200 text-[#101828] hover:bg-gray-300"
                }`}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Article;
