import React from "react";
import { userAuthStore } from "../../../store/userAuthStore";
import DarkModeBtn from "../Buttons/DarkModeBtn";
import { MoveIcon, MoveLeft } from "lucide-react";

const TermsOfService = () => {
  const { isDarkMode } = userAuthStore();

  return (
    <div
      className={`min-h-screen py-8 px-4 ${
        isDarkMode ? "bg-[#101828] text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex flex-row justify-between">
        <div className="">
          <MoveLeft />
        </div>

        <div>
            <div className="bg-[#1E2939] h-10">
                <DarkModeBtn />
            </div>
        </div>
      </div>

      {/* Inner container only controls the background. */}
      <div
        className={`max-w-4xl mx-auto rounded-lg shadow-sm p-6 ${
          isDarkMode ? "bg-[#1E2939]" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p className="mb-4">
            Welcome to <span className="font-semibold">Prime Brain</span>! Our
            platform helps users save and organize links from various online
            platforms. These Terms of Service ("Terms") govern your use of our
            website and services. By accessing or using our platform, you agree
            to be bound by these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Acceptance of Terms</h2>
          <p className="mb-4">
            Our services are available to all users who comply with these Terms.
            By using our services, you represent that you will adhere to all
            content restrictions and community guidelines.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            3. User Responsibilities
          </h2>
          <p className="mb-4">You agree to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide accurate information when creating an account</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Not engage in any illegal or unauthorized activities</li>
            <li>Never submit or share links to pornographic content</li>
            <li>Only save links from legitimate, public platforms</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            4. Content Restrictions
          </h2>
          <p className="mb-4">Strictly prohibited content includes:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Pornographic material or adult content</li>
            <li>Illegal or pirated content</li>
            <li>Malware or phishing links</li>
            <li>Content promoting violence or hate speech</li>
            <li>Copyright-infringing material</li>
          </ul>
          <p className="mt-4">
            We reserve the right to remove any content that violates these
            guidelines without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
          <p className="mb-4">
            We reserve the right to immediately suspend or terminate your access
            to our services for any violation of these Terms, particularly for
            sharing prohibited content. Termination may occur without prior
            notice at our sole discretion.
          </p>
        </section>
        {/* ... other sections ... */}
      </div>
    </div>
  );
};

export default TermsOfService;
