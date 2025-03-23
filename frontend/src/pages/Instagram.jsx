import React, { useState, useEffect } from "react";
import Layout from "./Layout"; // Adjust if needed
import { userAuthStore } from "../../store/userAuthStore";

const Instagram = () => {
  const { getAllContent, isDarkMode } = userAuthStore();
  const [allContent, setAllContent] = useState([]);

  // Fetch content from your store
  const loadContent = async () => {
    try {
      const res = await getAllContent();
      console.log("Fetched content:", res.data);

      if (Array.isArray(res.data)) {
        setAllContent(res.data);
      } else if (res.data) {
        setAllContent([res.data]);
      } else {
        setAllContent([]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Filter items for "instagram.com" in the link
  const instaCards = allContent.filter(
    (item) => item.link && item.link.includes("instagram.com")
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Instagram</h1>
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
            {/* Example fallback image */}
            <img
              src="https://via.placeholder.com/300"
              alt={card.title || "Instagram Content"}
              className="w-full h-48 object-cover"
            />
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
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View on Instagram
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Instagram;
