import React from 'react'
import './ForgotPassword.css'
import forgotPasswordImage from '../../assets/forgot-password.png'

function ForgotPassword() {
  return (
    <div className='forgot-password'>
        <div className="forgot-password-content">
            <div className="forgot-password-text">
            <h1>Forgot Your Password ?</h1>
            <p>To reset your password,Please enter email address of your <span>ToDoo</span> account.</p>
            </div>
            <div className="forgot-password-form">
            <form>
                <input type="email" placeholder='Email Address' />
                <button className='forgot-password-form-btn'>Send Reset Link</button>
            </form>
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