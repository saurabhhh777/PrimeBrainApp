import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Navbar from './components/NavbarPage/Navbar.jsx';
import ErrorPage from './components/pages/ErrorPage.jsx';
import Signin from './components/pages/Signin.jsx';
import Signup from './components/pages/Signup.jsx';
import Home from './components/pages/Home.jsx';
import Content from './components/pages/Content.jsx';
import Profile from './components/pages/Profile.jsx';

const App = () => {
  return (
    <div>

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/content" element={<Content />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App