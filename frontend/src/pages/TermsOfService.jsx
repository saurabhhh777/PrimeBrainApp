import React from "react";
import { userAuthStore } from "../../store/userAuthStore";
import NormalNav from "../NavbarPage/NormalNav";
import Footer from "./Footer";

const TermsOfService = () => {
  const { isDarkMode } = userAuthStore();

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}>

      <div className="pt-2">
        <NormalNav />
      </div>

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto rounded-xl p-8 shadow-lg transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}>
          <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Terms of Service
          </h1>

          <p className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-10">
            <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              1. Introduction
            </h2>
            <p className="mb-4 leading-relaxed">
              Welcome to <span className={`font-semibold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>Prime Brain</span>! Our
              platform helps users save and organize links from various online
              platforms. These Terms of Service ("Terms") govern your use of our
              website and services. By accessing or using our platform, you agree
              to be bound by these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              2. Acceptance of Terms
            </h2>
            <p className="mb-4 leading-relaxed">
              Our services are available to all users who comply with these Terms.
              By using our services, you represent that you will adhere to all
              content restrictions and community guidelines.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              3. User Responsibilities
            </h2>
            <p className="mb-4 font-medium">You agree to:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Provide accurate information when creating an account
              </li>
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Maintain the confidentiality of your account credentials
              </li>
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Not engage in any illegal or unauthorized activities
              </li>
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Never submit or share links to pornographic content
              </li>
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Only save links from legitimate, public platforms
              </li>
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Comply with all applicable laws and regulations
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              4. Content Restrictions
            </h2>
            <p className="mb-4 font-medium">Strictly prohibited content includes:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Pornographic material or adult content
              </li>
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Illegal or pirated content
              </li>
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Malware or phishing links
              </li>
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Content promoting violence or hate speech
              </li>
              <li className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Copyright-infringing material
              </li>
            </ul>
            <p className={`mt-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              We reserve the right to remove any content that violates these
              guidelines without notice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              9. Termination
            </h2>
            <p className="leading-relaxed">
              We reserve the right to immediately suspend or terminate your access
              to our services for any violation of these Terms, particularly for
              sharing prohibited content. Termination may occur without prior
              notice at our sole discretion.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;