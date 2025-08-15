import React, { useState } from 'react';
import { userAuthStore } from '../../store/userAuthStore';
import { axiosInstance } from '../../lib/axios';

const AuthDebug = () => {
  const { Authuser, isCheckingAuth, checkAuth } = userAuthStore();
  const [testResult, setTestResult] = useState('');

  const testAuth = async () => {
    try {
      setTestResult('Testing...');
      const res = await axiosInstance.get('/api/v1/user/check');
      setTestResult(`Success: ${JSON.stringify(res.data)}`);
    } catch (error) {
      setTestResult(`Error: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <p>User: {Authuser ? 'Logged In' : 'Not Logged In'}</p>
        <p>Checking: {isCheckingAuth ? 'Yes' : 'No'}</p>
        <p>User ID: {Authuser?._id || 'None'}</p>
        <div className="space-y-1 mt-2">
          <button 
            onClick={checkAuth}
            className="bg-blue-500 px-2 py-1 rounded text-xs w-full"
          >
            Check Auth
          </button>
          <button 
            onClick={testAuth}
            className="bg-green-500 px-2 py-1 rounded text-xs w-full"
          >
            Test Auth API
          </button>
        </div>
        {testResult && (
          <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
            <p className="break-all">{testResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthDebug; 