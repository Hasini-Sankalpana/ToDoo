import React from 'react';
import './DashboardSidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';

function DashboardSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/signin');
    }

  return (
    <div className='sidebar'>
      <div className="sidebar-logo">
      <h2><i class="ri-bubble-chart-fill"></i> ToDoo</h2>
      </div>
      <div className="sidebar-tabs">
      <NavLink 
          to="/dashboard"
          end
          className={({ isActive }) => `sidebar-tab ${isActive ? 'active' : ''}`}
        >
          <p><i className="ri-task-fill"></i> Tasks</p>
        </NavLink>
        
        <NavLink 
          to="/dashboard/profile"
          className={({ isActive }) => `sidebar-tab ${isActive ? 'active' : ''}`}
        >
          <p><i className="ri-profile-fill"></i> Profile</p>
        </NavLink>
        
      </div>

      <div className="sidebar-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default DashboardSidebar;