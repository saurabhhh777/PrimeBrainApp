import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div>
            <Link to="/">
                <h2>Logo</h2>
            </Link>
        </div>
        <div>
            <Link to="/profile">
                <h2>Profile</h2>
            </Link>
            <Link to="/">
                <h2>Home</h2>
            </Link>
            <Link to="/content">
                <h2>Content</h2>
            </Link>
            <Link to="/login">
                <h2>Link</h2>
            </Link>
        </div>
    </div>
  )
}

export default Navbar