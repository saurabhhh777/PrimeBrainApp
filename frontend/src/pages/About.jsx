import React from 'react';
import { Users, Target, Mail } from 'lucide-react';

import NormalNav from "../NavbarPage/NormalNav.jsx";
import { userAuthStore } from '../../store/userAuthStore';
import Footer from "./Footer";

const About = () => {
  const { isDarkMode } = userAuthStore();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className='pt-2'>
        <NormalNav />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className={`text-5xl lg:text-7xl font-bold mb-6 ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' : 'text-gray-900'}`}>
            Innovating Tomorrow
          </h1>
          <p className={`text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We're bridging the gap between technological potential and human needs through cutting-edge solutions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className={`p-8 rounded-2xl transition-all ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-[#E4E4E4] hover:bg-gray-100'} shadow-lg`}>
            <Users className={`w-12 h-12 mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} />
            <h3 className="text-2xl font-bold mb-2">10,000+</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Users</p>
          </div>
          <div className={`p-8 rounded-2xl transition-all ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-[#E4E4E4] hover:bg-gray-100'} shadow-lg`}>
            <Target className={`w-12 h-12 mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} />
            <h3 className="text-2xl font-bold mb-2">2025</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Founded In</p>
          </div>
          <div className={`p-8 rounded-2xl transition-all ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-[#E4E4E4] hover:bg-gray-100'} shadow-lg`}>
            <div className="w-12 h-12 mb-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">50+</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Team Members</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Global Talent</p>
          </div>
        </div>

        {/* Mission Section */}
        <div className={`mb-24 p-12 rounded-[2.5rem] ${isDarkMode ? 'bg-gray-800' : 'bg-[#E4E4E4]'} shadow-xl`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Our Guiding Principles
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className={`flex-shrink-0 w-2 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Technology should empower, not complicate. Our solutions combine intuitive design with robust functionality.
                </p>
              </div>
              <div className="flex gap-6">
                <div className={`flex-shrink-0 w-2 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Sustainability is built into every decision, from code architecture to business partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <h2 className={`text-4xl font-bold mb-16 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Only Founder */}
            <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-[#E4E4E4] hover:bg-gray-100'} transition-all`}>
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-full h-48 w-48 mx-auto mb-6 flex items-center justify-center">
                <span className="text-6xl text-white">👤</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Saurabh</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Founder of PrimeBrain</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center p-12 rounded-[2.5rem] ${isDarkMode ? 'bg-gray-800' : 'bg-[#E4E4E4]'} shadow-xl`}>
          <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Ready to Transform Your Vision?
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's collaborate to create solutions that drive real impact and lasting value.
          </p>
          <button className={`inline-flex items-center px-8 py-4 rounded-full font-semibold transition-all 
            ${isDarkMode 
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-purple-lg' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'}`}>
            <Mail className="mr-3" />
            Schedule Consultation
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
