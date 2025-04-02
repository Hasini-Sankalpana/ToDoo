import React from 'react'
import './Home.css'
import homeImage from '../../assets/home1.png'

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
         <button className='home-signup-btn'>Get Started</button>
       </div>
       </div>
       <div className="home-img">
          <img src={homeImage} alt="" />
       </div>
    </div>
  )
}

export default Home