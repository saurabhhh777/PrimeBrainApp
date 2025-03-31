import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
// import Navbar from './NavbarPage/Navbar.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Content from './pages/Article.jsx';
import Profile from './pages/Profile.jsx';


// import Hnavbar from './NavbarPage/Hnavbar.jsx';
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
// import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx';





const App = () => {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />


          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />


          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/blog" element={<Blog/>}/>


          {/* <Route path="/privacy-policy" element={<PrivacyPolicy/>}/> */}

          <Route path="/term-of-service" element={<TermsOfService/>}/>

          <Route path="/setting" element={<Setting/>}/>

          <Route path="/about" element={<About/>}/>

          <Route path='/dashboard' element={<Dashboard/>}/>
    
          <Route path="/dashboard/article" element={<Article />} />

          <Route path='/dashboard/youtube' element={<Youtube/>}/>

          <Route path="/dashboard/tweets" element={<Tweets/>}/>

          <Route path="/dashboard/reddit" element={<Reddit/>}/>

          <Route path="/dashboard/insta" element={<Instagram/>}/>


          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App