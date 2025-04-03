import React from 'react'
import './DashboardSidebar.css'
import { Link } from 'react-router-dom'

function DashboardSidebar() {

  return (
    <div className='sidebar'>
      <div className="sidebar-tabs">
      <Link to="/dashboard" className="profile-tab">
          <p><i class="ri-user-fill"></i> My Space</p>
        </Link>
        <Link to="/dashboard/profile" className="profile-tab">
          <p><i class="ri-profile-fill"></i> Profile</p>
        </Link>
        <Link to="/dashboard/tasks" className="tasks-tab">
          <p><i class="ri-task-fill"></i> Tasks</p>
        </Link>
      </div>

        <div className="sidebar-button">
      <button>Logout</button>
      </div>
    </div>
  )
}

export default DashboardSidebar