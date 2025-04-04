import React from 'react'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './ResetPassword.css'
import resetPasswordImage from '../../assets/reset-password.png'
import axios from 'axios'
import { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'


function ResetPassword() {

  const { token } = useParams()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      setMessage('')
      return
    }
    try {
      const response = await axios.post('http://localhost:3000/api/user/reset-password', { token, newPassword })
      if (response.status == 200) {
        setMessage(response.data.message)
        setError('')
        setTimeout(() => navigate('/signin'), 2000); 
      } else {
        setError(response.data.message)
        setMessage('')
      }
    } catch (err) {
      console.log(err)
      setError("Something went wrong.Please try again")
      setMessage('')
    }
  }
     
  return (
    <div className='reset-password'>
                <div className="reset-password-content">
                    <div className="reset-password-text">
                    <h1>Reset password</h1>
                    <p>Please enter a new password for your <span>ToDoo</span> account.</p>
                    </div>

                    <div className="reset-password-form">
                    <form onSubmit={handlePasswordChange}>
                        <label>Enter New Password</label>
                        <input 
                        type="password" 
                        placeholder='Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                         />  
                        <label>Confirm New Password</label> 
                                 <div className="reset-password-input-wrapper">
                                 <input
                                   type={showConfirmPassword ? "text" : "password"}
                                   placeholder="Confirm Password"
                                   className="reset-password-input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                 />

                                 <button
                                   type="button"
                                   className="reset-password-eye-toggle"
                                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                 >
                                   {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                                 </button>
                               </div>
                        <button className='reset-password-form-btn' type='submit'>Reset Password</button>
                    </form>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
                <div className="reset-password-image">
                    <img src={resetPasswordImage} alt="" />
                    </div>
                  
            </div>
  )
}

export default ResetPassword