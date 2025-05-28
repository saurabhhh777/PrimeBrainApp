import React from 'react';
import DarkModeBtn from '../components/Buttons/DarkModeBtn';
import { userAuthStore } from '../../store/userAuthStore';

const PrivacyPolicy = () => {
  const { isDarkMode } = userAuthStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Dark Mode Button */}
        <div className="flex justify-end mb-6">
          <DarkModeBtn />
        </div>
        
        <div className={`max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h1>
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Introduction</h2>
            <p className="mb-4">
              We are committed to protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, and protect your information when you use our services.
            </p>
          </div>

          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Information We Collect</h2>
            <p className="mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Register on our website</li>
              <li className="mb-2">Use our services</li>
              <li className="mb-2">Contact us with inquiries</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Provide and maintain our services</li>
              <li className="mb-2">Communicate with you</li>
              <li className="mb-2">Improve user experience</li>
              <li className="mb-2">Ensure website security</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Data Protection</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information
              from unauthorized access, alteration, or destruction. These include encryption,
              secure servers, and regular security audits.
            </p>
          </div>

          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Access your personal data</li>
              <li className="mb-2">Request correction of your data</li>
              <li className="mb-2">Request deletion of your data</li>
              <li className="mb-2">Opt-out of communications</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Cookies</h2>
            <p className="mb-4">
              We use cookies to enhance your experience. You can control cookies through your browser settings.
            </p>
          </div>

          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Third-Party Services</h2>
            <p className="mb-4">
              We may use third-party services (e.g., analytics tools) that collect anonymous usage data.
              These services have their own privacy policies governing data use.
            </p>
          </div>

          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Policy Changes</h2>
            <p className="mb-4">
              We may update this policy periodically. Changes will be posted on this page with an updated revision date.
            </p>
          </div>

          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Contact Us</h2>
            <p className="mb-4">
              For questions about this policy, contact us at: <br />
              <a 
                href="mailto:privacy@example.com" 
                className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} underline`}
              >
                privacy@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;