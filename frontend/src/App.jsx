import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Tasks from './pages/Tasks/Tasks'
import Profile from './pages/Profile/Profile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  return (
    <div>
         {!isDashboardRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />

        <Route element={<ProtectedRoute/>}>
        <Route path="/dashboard" element={<Tasks/>} />
        <Route path="/dashboard/profile" element={<Profile/>} />
        </Route>

      </Routes>
    </div>
  )
}

export default App