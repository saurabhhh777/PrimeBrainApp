import React, { useState, useEffect } from "react";
import Layout from "./Layout"; // Adjust path if needed
import { userAuthStore } from "../../store/userAuthStore";

const Youtube = () => {
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

  // Filter for items containing “youtube.com” or "youtu.be" in the link
  const youtubeCards = allContent.filter(
    (item) =>
      item.link &&
      (item.link.includes("youtube.com") || item.link.includes("youtu.be"))
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">YouTube</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {youtubeCards.map((card, index) => (
          <div
            key={index}
            className={`${
              isDarkMode
                ? "bg-[#1E2939] text-white"
                : "bg-white border border-gray-200 text-[#101828]"
            } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
          >
            {/* If you want to embed the video directly: */}
            <div className="w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${
                  card.link.includes("v=")
                    ? card.link.split("v=")[1].split("&")[0]
                    : card.link.split("/").pop()
                }`}
                title={card.title || "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            <hr />

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {card.title || "Untitled Video"}
              </h2>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
                {card.description || "No description provided."}
              </p>
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Youtube;
