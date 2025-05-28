import React from 'react';
import DarkModeBtn from '../components/Buttons/DarkModeBtn';
import { userAuthStore } from '../../store/userAuthStore';
import Footer from "./Footer";
import NormalNav from "../NavbarPage/NormalNav.jsx";

const PrivacyPolicy = () => {
  const { isDarkMode } = userAuthStore();

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <NormalNav />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Dark Mode Button - Positioned in top right */}
          <div className="flex justify-end mb-6">
            <DarkModeBtn />
          </div>
          
          {/* Policy Content Container */}
          <div className={`max-w-4xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {/* Header Section */}
            <div className="mb-10 text-center">
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Privacy Policy
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-10">
              <section>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  Introduction
                </h2>
                <p className="mb-4 leading-relaxed">
                  We are committed to protecting your personal information and your right to privacy.
                  This Privacy Policy explains how we collect, use, and protect your information when you use our services.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  Information We Collect
                </h2>
                <p className="mb-4 leading-relaxed">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Register on our website</li>
                  <li>Use our services</li>
                  <li>Contact us with inquiries</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  How We Use Your Information
                </h2>
                <p className="mb-4 leading-relaxed">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Personalize your experience</li>
                  <li>Communicate with you</li>
                  <li>Improve user experience</li>
                  <li>Ensure website security</li>
                  <li>Develop new products and services</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  Data Protection
                </h2>
                <p className="mb-4 leading-relaxed">
                  We implement industry-standard security measures to protect your personal information
                  from unauthorized access, alteration, or destruction. These include:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>End-to-end encryption</li>
                  <li>Secure server infrastructure</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication protocols</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  Your Rights
                </h2>
                <p className="mb-4 leading-relaxed">
                  Under data protection laws, you have the right to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  Cookies
                </h2>
                <p className="mb-4 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings or our cookie preference center.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  Third-Party Services
                </h2>
                <p className="mb-4 leading-relaxed">
                  We may use third-party services (e.g., analytics tools, payment processors) that collect anonymous usage data. These services have their own privacy policies governing data use.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  Policy Changes
                </h2>
                <p className="mb-4 leading-relaxed">
                  We may update this policy periodically. Significant changes will be notified through our website or email. We recommend reviewing this page regularly.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  Contact Us
                </h2>
                <p className="mb-4 leading-relaxed">
                  For questions about this policy or to exercise your data rights, contact our Data Protection Officer at:
                </p>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <a 
                    href="mailto:saurabhhhere@gmail.com" 
                    className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} underline`}
                  >
                    saurabhhhere@gmail.com
                  </a>
                  <p className="mt-2">
                    We typically respond within 48 hours.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;