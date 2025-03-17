import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
// import Navbar from './NavbarPage/Navbar.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Content from './pages/Content.jsx';
import Profile from './pages/Profile.jsx';
// import Hnavbar from './NavbarPage/Hnavbar.jsx';
import Setting from './pages/Setting.jsx';
import Blog from './pages/Blog.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LinkPage from './pages/LinkPage.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
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