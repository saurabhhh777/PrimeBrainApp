import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import ErrorPage from './pages/ErrorPage.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Setting from './pages/Setting.jsx';
import Blog from './pages/Blog.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import Youtube from './pages/Youtube.jsx';
import Article from './pages/Article.jsx';
import Tweets from './pages/Tweets.jsx';
import Reddit from './pages/Reddit.jsx';
import Instagram from './pages/Instagram.jsx';
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';





const App = () => {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />


          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />


          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/blogs" element={<Blog/>}/>
          <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>

          <Route path="/term-of-service" element={<TermsOfService/>}/>

          <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />

          <Route path="/about" element={<About/>}/>

          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
    
          <Route path="/dashboard/article" element={<ProtectedRoute><Article /></ProtectedRoute>} />

          <Route path='/dashboard/youtube' element={<ProtectedRoute><Youtube /></ProtectedRoute>}/>

          <Route path="/dashboard/tweets" element={<ProtectedRoute><Tweets /></ProtectedRoute>}/>

          <Route path="/dashboard/reddit" element={<ProtectedRoute><Reddit /></ProtectedRoute>}/>

          <Route path="/dashboard/insta" element={<ProtectedRoute><Instagram /></ProtectedRoute>}/>



          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App