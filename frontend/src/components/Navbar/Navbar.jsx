import React from 'react'
import { useState } from 'react'
import { useLocation,Link} from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const[isMenuOpen,setIsMenuOpen] = useState(false)
    const location = useLocation()
    const isHomePage = location.pathname === '/'

  return (
    <div className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css" rel="stylesheet"/>
       <div className="nav-logo">
        <Link to='/' className='logo-link'><h2><i class="ri-bubble-chart-fill"></i> ToDoo</h2></Link> 
       </div>

       {isHomePage && (
        <>
       <div className="nav-btn">
       <Link to='/signup'><button className='signin-btn'>Log in</button></Link>
       <Link to='/signin'><button className='signup-btn'>Sign Up</button></Link>
       </div>

       <div className="menu-icon" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <i class="ri-close-fill"></i> : <i class="ri-menu-2-fill"></i>}
       </div>

       { isMenuOpen && (
        <div className="menu">
          <Link to='/signup'><button className='menu-signup-btn'>Sign Up</button></Link> 
          <Link to='/signin'><button className='menu-signin-btn'>Log in</button></Link> 
        </div>
    )}
    </>
       )}
    </div>
  )
}

export default Navbar