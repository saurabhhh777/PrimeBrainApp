import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-gray-600">Last updated: [Insert Date]</p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4 text-gray-700">
            We are committed to protecting your personal information and your right to privacy.
            This Privacy Policy explains how we collect, use, and protect your information when you use our services.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4 text-gray-700">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li className="mb-2">Register on our website</li>
            <li className="mb-2">Use our services</li>
            <li className="mb-2">Contact us with inquiries</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4 text-gray-700">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li className="mb-2">Provide and maintain our services</li>
            <li className="mb-2">Communicate with you</li>
            <li className="mb-2">Improve user experience</li>
            <li className="mb-2">Ensure website security</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Data Protection</h2>
          <p className="mb-4 text-gray-700">
            We implement appropriate security measures to protect your personal information
            from unauthorized access, alteration, or destruction. These include encryption,
            secure servers, and regular security audits.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4 text-gray-700">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li className="mb-2">Access your personal data</li>
            <li className="mb-2">Request correction of your data</li>
            <li className="mb-2">Request deletion of your data</li>
            <li className="mb-2">Opt-out of communications</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cookies</h2>
          <p className="mb-4 text-gray-700">
            We use cookies to enhance your experience. You can control cookies through your browser settings.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
          <p className="mb-4 text-gray-700">
            We may use third-party services (e.g., analytics tools) that collect anonymous usage data.
            These services have their own privacy policies governing data use.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Policy Changes</h2>
          <p className="mb-4 text-gray-700">
            We may update this policy periodically. Changes will be posted on this page with an updated revision date.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            For questions about this policy, contact us at: <br />
            <a href="mailto:privacy@example.com" className="text-blue-600 hover:underline">
              privacy@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;