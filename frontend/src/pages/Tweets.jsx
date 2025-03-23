import React, { useState, useEffect } from "react";
import Layout from "./Layout"; // Adjust path as needed
import { userAuthStore } from "../../store/userAuthStore";

const Tweets = () => {
  const { getAllContent, isDarkMode } = userAuthStore();
  const [allContent, setAllContent] = useState([]);

  // Fetch content
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

  // Only show those items that have links containing "x.com"
  const tweetsData = allContent.filter(
    (item) => item.link && item.link.includes("x.com")
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Tweets / X Posts</h1>
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
                    {tag}
                  </span>
                ))}
              </div>
              {/* Link */}
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 hover:underline"
              >
                Visit Tweet
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Tweets;
