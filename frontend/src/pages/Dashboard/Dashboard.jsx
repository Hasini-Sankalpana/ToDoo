import React from 'react'
import './Dashboard.css'
import DashboardSidebar from '../../components/DashboardSideBar/DashboardSideBar'
import MySpace from '../../components/MySpace/MySpace'

function Dashboard() {
  return (
    <div className='dashboard'>
        <DashboardSidebar/>
        <main className='dashboard-content'>
          <MySpace/>
        </main>
    </div>
  )
}

export default Dashboard