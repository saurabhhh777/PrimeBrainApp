import React from 'react';
import { userAuthStore } from '../../../store/userAuthStore';

function ErrorPage() {
  const { isDarkMode } = userAuthStore();

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center text-center p-4 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-[#f4f4f4] text-black'
      }`}
    >
      {/* Meme or funny image */}
      <img
        src="https://res.cloudinary.com/dongxnnnp/image/upload/v1741844404/urlShortner/swtsaffxb631tyuso6wm.gif"
        alt="Funny 404 Meme"
        className="max-w-full mb-4 rounded-lg shadow-lg"
        style={{ maxWidth: '500px' }}
      />

      {/* Error Message */}
      <h1 className="text-4xl font-bold mb-4">
        Oops! This Page is Missing
      </h1>

      {/* Playful Message */}
      <p className="text-lg mb-4">
        Looks like the page you were trying to reach is playing hide and seek.
      </p>

      {/* Meme Reference */}
      <p className="italic mb-8">
        “<strong>404</strong>? I have no idea what you’re talking about...”
      </p>

      {/* Home Button */}
      <button
        onClick={() => {
          window.location.href = '/';
        }}
        className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
          isDarkMode
            ? 'bg-[#4F46E5] hover:bg-[#4338CA] text-white'
            : 'bg-[#4F46E5] hover:bg-[#4338CA] text-white'
        }`}
      >
        Take Me Home
      </button>
    </div>
  );
}

export default ErrorPage;