import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import NormalNav from "../NavbarPage/NormalNav";
import { userAuthStore } from "../../../store/userAuthStore";

const Main = () => {
  const { isDarkMode } = userAuthStore();
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
    };
    sequence();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className={`h-screen w-full pt-3 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="pt-2 ">
        <NormalNav />
      </div>
      <motion.div 
        className="flex flex-row h-full w-full"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="flex flex-col w-1/2 mt-4 ml-3 mr-3">
          {/* Top Section */}
          <motion.div 
            className={`${isDarkMode ? "bg-gray-800" : "bg-[#e4e4e4]"} h-96 rounded m-1 items-center justify-center`}
            variants={containerVariants}
          >
            <motion.div className="ml-23 mt-11" variants={itemVariants}>
              <h2 className="font-righteous text-9xl">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Th
                </motion.span>
                <motion.span 
                  className="font-poppins"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  i
                </motion.span>
                nk
              </h2>
              <motion.h2 
                className="ml-96 font-righteous text-9xl"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                Bi<span className="font-jost">G.</span>
              </motion.h2>

              <motion.h2 
                className="font-rock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                liveyourdreamindiffrentway
              </motion.h2>
            </motion.div>
          </motion.div>

          {/* Bottom Section */}
          <div className="flex flex-row h-96">
            {/* Left Column */}
            <motion.div 
              className={`${isDarkMode ? "bg-gray-800" : "bg-[#e4e4e4]"} w-1/2 rounded m-1 flex items-center justify-center`}
              variants={slideFromLeft}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl text-center">
                <h2>Възмечтайтѣ</h2>
                <h2>сiе.</h2>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              className={`${isDarkMode ? "bg-gray-800" : "bg-[#e4e4e4]"} w-1/2 rounded m-1 flex items-center justify-center`}
              variants={slideFromRight}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="text-8xl flex flex-col font-rock text-center"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.2 } }
                }}
              >
                {["And", "Live", "it"].map((text, index) => (
                  <motion.h2
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    {text}
                  </motion.h2>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-1/2 rounded m-1 overflow-hidden">
          <motion.img
            src="https://res.cloudinary.com/dongxnnnp/image/upload/v1741764482/uzicwocyznznpshgoxvx.png"
            alt="stivesJobs"
            className="absolute top-0 left-0 w-full object-cover z-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <motion.div 
            className="relative z-10 mt-4 ml-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <h2 className="font-semibold text-4xl">Принимая</h2>
          </motion.div>
          <motion.div 
            className="relative z-10 ml-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <h2 className="font-rock">Dream it</h2>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Main;