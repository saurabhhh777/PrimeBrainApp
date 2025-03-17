import React from 'react';

const About = () => {
  return (
    <div className='h-screen min-w-screen bg-[#1E2939] text-white'>
      <div className="container mx-auto px-6 py-12 h-full flex flex-col justify-center items-center">
        {/* Page Title */}
        <h1 className="text-5xl font-bold mb-8 text-center">
          About Us
        </h1>

        {/* Introduction Section */}
        <div className="max-w-3xl text-center mb-12">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold">Our Company</span>, where innovation meets excellence. We are dedicated to providing cutting-edge solutions that empower businesses and individuals to achieve their goals. Our team of experts is passionate about delivering high-quality products and services that make a real difference.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-[#2C3A4E] p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-center">
            Our mission is to simplify complexity and drive growth through innovative technology and exceptional customer service. We strive to create meaningful connections and deliver value to our clients every step of the way.
          </p>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Team Member 1 */}
            <div className="w-48 text-center">
              <div className="bg-[#2C3A4E] rounded-full h-32 w-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-400">CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="w-48 text-center">
              <div className="bg-[#2C3A4E] rounded-full h-32 w-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍💻</span>
              </div>
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-400">CTO</p>
            </div>

            {/* Team Member 3 */}
            <div className="w-48 text-center">
              <div className="bg-[#2C3A4E] rounded-full h-32 w-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍🎨</span>
              </div>
              <h3 className="text-xl font-semibold">Mike Johnson</h3>
              <p className="text-gray-400">Lead Designer</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-6">
            Join us on our journey to create a better future. Let's work together to achieve greatness.
          </p>
          <button className="bg-[#4F46E5] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#4338CA] transition duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;