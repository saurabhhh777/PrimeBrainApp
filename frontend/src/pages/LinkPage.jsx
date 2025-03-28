import React, { useState, useEffect } from "react";
import Layout from "./Layout"; // or your appropriate path
import { userAuthStore } from "../../store/userAuthStore";

const LinkPage = () => {
  const { getAllContent, isDarkMode } = userAuthStore();

  const [allContent, setAllContent] = useState([]);

  // Fetch and update content state.
  const loadContent = async () => {
    try {
      const res = await getAllContent();
      console.log("Frontend getAllContent response:", res.data);

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

  // Filter to show only those cards which have a valid link
  const linkCards = allContent.filter((card) => card.link);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">All Links</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {linkCards.map((card, index) => (
          <div
            key={index}
            className={`${
              isDarkMode
                ? "bg-[#1E2939] text-white"
                : "bg-white border border-gray-200 text-[#101828]"
            } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
          >
            {/* Check if the link is from YouTube */}
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

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {card.description || "No Description"}
              </p>
              <div
                className={`text-sm mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span>
                  {card.createdAt ? card.createdAt.split("T")[0] : "Unknown Date"}
                </span>{" "}
                |{" "}
                {card.updatedAt
                  ? card.updatedAt.split("T")[0]
                  : "Unknown Date"}
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag, tagIndex) => (
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
                Visit Link
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default LinkPage;
