import React from 'react'
import './ForgotPassword.css'
import forgotPasswordImage from '../../assets/forgot-password.png'
import axios from 'axios'
import { useState } from 'react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('http://localhost:3000/api/user/forgot-password', { email })
       
        if (response.data.success) {
            setMessage(response.data.message)
            setError('')
        }
        else {
            setError(response.data.message)
            setMessage('')
        }
    } catch (err) {
        console.log(err)
        setError(err.response.data.message)
        setMessage('')
    }
  }


  return (
    <div className='forgot-password'>
        <div className="forgot-password-content">
            <div className="forgot-password-text">
            <h1>Forgot Your Password ?</h1>
            <p>To reset your password,Please enter email address of your <span>ToDoo</span> account.</p>
            </div>
            <div className="forgot-password-form">
            <form onSubmit={handleSubmit}>
                <input 
                type="email" 
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <button className='forgot-password-form-btn'>Send Reset Link</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="forgot-password-footer">
            <p>Remember your password? <a href='/signin'>Sign In</a></p>
            </div>
        </div>
        <div className="forgot-password-image">
            <img src={forgotPasswordImage} alt="" />
            </div>
           
    </div>
  )
}

export default ForgotPassword