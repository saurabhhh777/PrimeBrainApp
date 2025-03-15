import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Navbar from './components/NavbarPage/Navbar.jsx';
import ErrorPage from './components/pages/ErrorPage.jsx';
import Signin from './components/pages/Signin.jsx';
import Signup from './components/pages/Signup.jsx';
import Home from './components/pages/Home.jsx';
import Content from './components/pages/Content.jsx';
import Profile from './components/pages/Profile.jsx';
import Hnavbar from './components/NavbarPage/Hnavbar.jsx';
import Setting from './components/pages/Setting.jsx';
import Blog from './components/pages/Blog.jsx';
import Pricing from './components/pages/Pricing.jsx';
import About from './components/pages/About.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import LinkPage from './components/pages/LinkPage.jsx';
import TermsOfService from './components/pages/TermsOfService.jsx';
// import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx';





const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/content" element={<Content />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/blog" element={<Blog/>}/>


          {/* <Route path="/privacy-policy" element={<PrivacyPolicy/>}/> */}

          <Route path="/term-of-service" element={<TermsOfService/>}/>

          <Route path="/setting" element={<Setting/>}/>

          <Route path="/about" element={<About/>}/>

          <Route path="/link" element={<LinkPage/>}/>


          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App