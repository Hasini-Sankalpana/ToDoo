import React from 'react'
import './Home.css'
import homeImage from '../../assets/home.png'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home'>
        <div className="home-content">
        <div className="home-text">
       <h1>Reclaim Your Focus,<br /> One Task at a Time</h1>
       <p>The intuitive task manager that helps high achievers like you organize chaos into clarity.</p>
       </div>
       <div className="home-btn">
       <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
        </span>
        <Link to='/signup'><button className='home-signup-btn'>Get Started</button></Link>
       </div>
       </div>
       <div className="home-img">
          <img src={homeImage} alt="" />
       </div>
    </div>
  )
}

export default Home