import React from 'react'
import { userAuthStore } from '../../../store/userAuthStore'


const ErrorPage = () => {

  const {isDarkMode} = userAuthStore();

  return (
    <div>
        <div className={`flex flex-col items-center justify-center h-screen ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>404</h2>
            <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Page Not Found</h3>
        </div>
    </div>
  )
}

export default ErrorPage