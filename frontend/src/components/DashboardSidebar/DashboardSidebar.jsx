import React from 'react';
import './DashboardSidebar.css';
import { NavLink } from 'react-router-dom';

function DashboardSidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar-tabs">
        <NavLink 
          to="/dashboard" 
          end
          className={({ isActive }) => `sidebar-tab ${isActive ? 'active' : ''}`}
        >
          <p><i className="ri-user-fill"></i> My Space</p>
        </NavLink>
        <NavLink 
          to="/dashboard/profile"
          className={({ isActive }) => `sidebar-tab ${isActive ? 'active' : ''}`}
        >
          <p><i className="ri-profile-fill"></i> Profile</p>
        </NavLink>
        <NavLink 
          to="/dashboard/tasks"
          className={({ isActive }) => `sidebar-tab ${isActive ? 'active' : ''}`}
        >
          <p><i className="ri-task-fill"></i> Tasks</p>
        </NavLink>
      </div>

      <div className="sidebar-button">
        <button>Logout</button>
      </div>
    </div>
  );
}

export default DashboardSidebar;