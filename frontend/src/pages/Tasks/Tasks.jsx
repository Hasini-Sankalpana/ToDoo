import React from 'react'
import './Tasks.css'
import DashboardSidebar from '../../components/DashboardSideBar/DashboardSideBar'
import UserTasks from '../../components/UserTasks/UserTasks'

function Tasks() {
  return (
    <div className='tasks'>
        <DashboardSidebar/>
        <main className='tasks-content'>
        <UserTasks/>
        </main>
    </div>
  )
}

export default Tasks