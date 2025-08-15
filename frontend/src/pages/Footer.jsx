import React, { useState } from "react";
import { MoveRight, Github, Linkedin, Twitter } from "lucide-react";
import { userAuthStore } from "../../store/userAuthStore";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../lib/axios.jsx";
import toast, { Toaster } from "react-hot-toast";

const mypic =
  "https://res.cloudinary.com/dongxnnnp/image/upload/v1739618128/urlShortner/rgwojzux26zzl2tc4rmm.webp";

const Footer = () => {
  const { isDarkMode } = userAuthStore();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeaturesClick = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/api/v1/newsletter/subscribe", {
        email: email.trim(),
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error(response.data.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      const errorMessage = error.response?.data?.message || "Failed to subscribe to newsletter";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <footer
        className={`w-full px-6 py-12 md:px-12 lg:px-24 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-[#e4e4e4] text-gray-900"
        }`}
      >
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <hr
              className={`w-12 border-t-2 ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            />
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              Have questions or suggestions? We'd love to hear from you.
            </p>
            <div className="space-y-2">
              <p className="font-semibold">Email: saurabhhhere@gmail.com</p>
              <p className="font-semibold">Phone: +91 6399679782</p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Stay Updated</h2>
            <hr
              className={`w-12 border-t-2 ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            />
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className={`w-full rounded-lg border px-4 py-2 ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 rounded-lg px-6 py-2 ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-200 disabled:opacity-50"
                    : "bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                }`}
              >
                {isSubmitting ? "Joining..." : (
                  <>
                    Join <MoveRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Quick Links</h2>
            <hr
              className={`w-12 border-t-2 ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            />
            <nav className="grid grid-cols-2 gap-2">
              {["About", "Features", "Pricing", "Blogs", "Help", "Careers"].map(
                (link) => (
                  <Link
                    key={link}
                    to={link === "Features" ? "#" : `/${link.toLowerCase()}`} // Use "#" for Features to prevent page reload
                    onClick={
                      link === "Features" ? handleFeaturesClick : undefined
                    } // Handle click for Features
                    className={`${
                      isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    } hover:underline`}
                  >
                    {link}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Follow Us</h2>
            <hr
              className={`w-12 border-t-2 ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            />
            <div className="flex gap-4">
              {/* Social Media Icons */}
              <a
                href="https://twitter.com/saurabhhh777"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full p-2 ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://github.com/saurabhhh777"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full p-2 ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/saurabh-maurya-92b727245/"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full p-2 ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <Linkedin size={20} />
              </a>
            </div>
            {/* Profile Picture */}
            <div className="mt-4 flex items-center gap-4">
              <a href="https://www.asksaurabh.xyz" target="_blank">
                <img
                  src={mypic}
                  alt="Profile"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Saurabh Maurya</p>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    Full Stack Developer
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-12 border-t pt-8 text-center ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            © {new Date().getFullYear()} PrimeBrainApp. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <Link
              to="/privacypolicy"
              className={
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }
            >
              Privacy Policy
            </Link>
            <Link
              to="/term-of-service"
              className={
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
};

export default Footer;
