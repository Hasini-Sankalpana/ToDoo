import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App