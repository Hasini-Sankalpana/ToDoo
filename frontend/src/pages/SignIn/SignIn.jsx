import React from 'react'
import './SignIn.css'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import googleLogo from '../../assets/google-btn.png'
import signupImage from '../../assets/signin-img.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase'; 

function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); 
      }else{
        setErrorMessage(response.data.message);
      }
    }catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Sign In failed!');
    }finally {
      setLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const { displayName, email } = user;
      const response = await axios.post('http://localhost:3000/api/user/google', {
        name: displayName,
        email: email,
      });
  
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Google Sign In Error:', error);
      setErrorMessage('Google Sign In failed. Please try again.');
    }
  };
  
  return (
    <div className='signin'>
      <div className="signin-content">
        <div className="signin-text">
          <h1>Welcome Back !</h1>
        </div>
        <div className="google-btn" onClick={handleGoogleSignIn}>
          <img src={googleLogo} alt="google-logo" />
          <h2>Sign in with Google</h2>
        </div>
        <div className="signin-form">
          <form onSubmit={handleSubmit}>
            <input type="email" 
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
 
          <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className='signin-form-btn' type='submit' disabled={loading}>{loading ? 'Signing In...':'Sign In'}</button>
            <div className="signin-forgot-password">
              <a href='/forgot-password'>Forgot Password?</a>
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