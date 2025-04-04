import React from 'react'
import './SignUp.css'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import googleLogo from '../../assets/google-btn.png'
import signupImage from '../../assets/signup-img.png'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/user/register', {
        fullname: fullName,
        email,
        password,
        confirmPassword,
      });

     
      //console.log(response.data);
       if (response.data.success){
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');

  
        localStorage.setItem('token', response.data.token);

        console.log('User registered successfully:', response.data.message);

        navigate('/dashboard');
        
       }else{
        setErrorMessage(response.data.message);
       }

    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)}/>
            <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            
          <div className="input-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className='signup-form-btn' type='submit' disabled={loading}>{loading ? ' Signing Up...' : 'Sign Up'}</button>
            <p className='signup-form-terms'>By signing up, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.</p>
          </form>
        </div>
        <div className="signup-footer">
          <p>Already have an account? <a href='/signin'>Log In</a></p>
        </div>
      </div>
      <div className="signup-image">
        <img src={signupImage} alt="" />
      </div>
    </div>
  )
}

export default SignUp