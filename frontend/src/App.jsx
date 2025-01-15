import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import Home from "./components/pages/Home.jsx";
import Tweets from "./components/pages/Tweets.jsx";
import Mlinks from "./components/pages/Mlinks.jsx";
import Videos from "./components/pages/Videos.jsx";
import Documents from "./components/pages/Documents.jsx";
import Tags from "./components/pages/Tags.jsx";
import Signin from './components/pages/Signin.jsx';
import Signup from "./components/pages/Signup.jsx";
import Erpage from './components/pages/Erpage.jsx';
import { userAuthStore } from '../store/userAuthStore.js';

const App = () => {
  const { isCheckingAuth, checkAuth, Authuser } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(`Auth Status: ${Authuser}`);

  // Show loader if checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Redirect to home if authenticated, otherwise signin */}
          <Route path="/" element={Authuser ? <Home /> : <Navigate to="/signin" />} />
          
          {/* Protected Routes */}
          <Route path="/tweets" element={Authuser ? <Tweets /> : <Navigate to="/signin" />} />
          <Route path="/videos" element={Authuser ? <Videos /> : <Navigate to="/signin" />} />
          <Route path="/documents" element={Authuser ? <Documents /> : <Navigate to="/signin" />} />
          <Route path="/links" element={Authuser ? <Mlinks /> : <Navigate to="/signin" />} />
          <Route path="/tags" element={Authuser ? <Tags /> : <Navigate to="/signin" />} />

          {/* Authentication Pages */}
          <Route path="/signin" element={ <Signin /> } />
          <Route path="/signup" element={<Signup /> } />

          {/* Error Page */}
          <Route path="*" element={<Erpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
