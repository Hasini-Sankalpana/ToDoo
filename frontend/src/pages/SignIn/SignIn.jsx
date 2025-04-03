import React from 'react'
import './SignIn.css'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import googleLogo from '../../assets/google-btn.png'
import signupImage from '../../assets/signin-img.png'

function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className='signin'>
      <div className="signin-content">
        <div className="signin-text">
          <h1>Welcome Back !</h1>
        </div>
        <div className="google-btn">
          <img src={googleLogo} alt="google-logo" />
          <h2>Sign in with Google</h2>
        </div>
        <div className="signin-form">
          <form>
            <input type="email" placeholder='Email Address' />
 
          <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="password-input"
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
        </div>
            <button className='signin-form-btn'>Sign In</button>
            <div className="forgot-password">
              <p>Forgot Password?</p>
            </div>
          </form>
        </div>
        <div className="signin-footer">
            <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
        </div>
      </div>
      <div className="signin-image">
        <img src={signupImage} alt="" />
      </div>
    </div>
  )
}

export default SignIn