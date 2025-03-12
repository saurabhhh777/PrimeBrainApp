import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { userAuthStore } from "../../../store/userAuthStore";

const Middle = () => {
  const { isDarkMode } = userAuthStore();

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const hoverEffect = {
    scale: 1.05,
    rotateZ: -1,
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <motion.div 
      className={`h-full w-full px-4 py-12 sm:px-6 lg:px-8 pt-50 pb-50 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="font-poppins mb-12 text-center text-3xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Features
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col rounded-xl border p-6 shadow-lg transition-all hover:shadow-xl ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"
              }`}
              variants={itemVariants}
              whileHover={hoverEffect}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-jost mb-3 text-2xl font-semibold">
                {feature.title}
              </h3>
              <p className={`font-poppins ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const features = [
  {
    title: "Centralized Feed",
    description:
      "Displays newly added notes, important links, and resources from multiple platforms (Twitter, Reddit, Instagram) in one unified view",
  },
  {
    title: "Quick Add Panel",
    description:
      "Lets users instantly input a title, description, and tags for new items without navigating away from the home screen.",
  },
  {
    title: "Search & Filter Controls",
    description:
      "Prominent search bar and filtering options (by tags, platform, date, etc.) to find saved items quickly.",
  },
  {
    title: "Tag Overview",
    description:
      "Shows commonly used or trending tags, offering a one-click way to filter content or discover related items.",
  },
  {
    title: "Responsive Layout",
    description:
      "Ensures the middle section adapts smoothly to different screen sizes, maintaining a clean, accessible design.",
  },
];

export default Middle;