import React from 'react'
import './Profile.css'
import DashboardSidebar from '../../components/DashboardSideBar/DashboardSideBar'
import UserProfile from '../../components/UserProfile/UserProfile'

function Profile() {
  return (
    <div className='profile'>
        <DashboardSidebar/>
        <main className='profile-content'>
            <UserProfile/>
        </main>
    </div>
  )
}

export default Profile