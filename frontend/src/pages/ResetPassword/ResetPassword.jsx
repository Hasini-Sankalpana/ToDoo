import React from 'react'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './ResetPassword.css'
import resetPasswordImage from '../../assets/reset-password.png'

function ResetPassword() {
     const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
     
  return (
    <div className='reset-password'>
                <div className="reset-password-content">
                    <div className="reset-password-text">
                    <h1>Reset password</h1>
                    <p>Please enter a new password for your <span>ToDoo</span> account.</p>
                    </div>

                    <div className="reset-password-form">
                    <form>
                        <label>Enter New Password</label>
                        <input type="password" placeholder='Password' />  
                        <label>Confirm New Password</label> 
                                 <div className="reset-password-input-wrapper">
                                 <input
                                   type={showConfirmPassword ? "text" : "password"}
                                   placeholder="Confirm Password"
                                   className="reset-password-input"
                                 />
                                 <button
                                   type="button"
                                   className="reset-password-eye-toggle"
                                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                 >
                                   {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                                 </button>
                               </div>
                        <button className='reset-password-form-btn'>Reset Password</button>
                    </form>
                    </div>
                </div>
                <div className="reset-password-image">
                    <img src={resetPasswordImage} alt="" />
                    </div>
            </div>
  )
}

export default ResetPassword