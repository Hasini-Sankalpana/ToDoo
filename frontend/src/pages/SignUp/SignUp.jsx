import React from 'react'
import './SignUp.css'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import googleLogo from '../../assets/google-btn.png'
import signupImage from '../../assets/signup-img2.png'

function SignUp() {
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className='signup'>
      <div className="signup-content">
        <div className="signup-text">
          <h1>Welcome to <span>ToDoo</span></h1>
          <p>Get Started - It's free.</p>
        </div>
        <div className="google-btn">
          <img src={googleLogo} alt="google-logo" />
          <h2>Sign up with Google</h2>
        </div>
        <div className="signup-form">
          <form>
            <input type="text" placeholder='Full Name' />
            <input type="email" placeholder='Email Address' />
            <input type="password" placeholder='Password' />
            
          <div className="input-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="password-input"
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        </div>
            <button className='signup-form-btn'>Sign Up</button>
            <p className='signup-form-terms'>By signing up, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.</p>
          </form>
        </div>
        <div className="signup-footer">
          <p>Already have an account? <a href='/'>Log In</a></p>
        </div>
      </div>
      <div className="signup-image">
        <img src={signupImage} alt="" />
      </div>
    </div>
  )
}

export default SignUp