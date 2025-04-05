import React, { useEffect, useState } from 'react'
import './UserProfile.css'

function UserProfile() {
  const [passwords, setPasswords] = useState({
    current:'',
    new:'',
    confirm:''
  })

  const [message, setMessage] = useState({ text: '', isError: false })
  const [isLoading, setIsLoading] = useState(true)
  const[userData, setUserData] = useState({
    name:'',
    email:'',
  })
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        const data = await response.json()
        setUserData({
          name: data.name || 'User',
          email: data.email || ''
        })
      } catch (error) {
        console.error(error)
        setMessage({ 
          text: "Failed to load user data", 
          isError: true 
        })
      } finally {
        setIsLoading(false)
      }
    }


    fetchUserData()
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target
    setPasswords({...passwords, [name]: value})
    if (message.text) setMessage({ text: '', isError: false })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      setMessage({ text: "Passwords do not match", isError: true })
      return
    }

    try{
      const response = await fetch('http://localhost:3000/api/user/change-password', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          oldPassword: passwords.current,
          newPassword: passwords.new,
        })
      })

      const data = await response.json()
      setMessage({ 
        text: data.message || "Password changed successfully!", 
        isError: false 
      })
      setPasswords({
        current: '',
        new: '',
        confirm: ''
      })
    } catch (error) {
      console.error(error)
      setMessage({ 
        text: "An error occurred while changing the password", 
        isError: true 
      })
    }
  }

  return (
    <div className='user-profile'>
      <div className="profile-details">
        <div className="profile-name">
          <h2>{userData.name}</h2>
        </div>
        <div className="profile-email">
          <p>{userData.email}</p>
        </div>
      </div>

      <div className="password-change-container">
        <h2>Change Your Password</h2>
        <form className="password-change-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='old-password'>Old Password</label>
            <input 
            type="password" 
            id="old-password" 
            value={passwords.current}
            onChange={handleChange}
            name="current"
            required />
          </div>
          <div className="form-group">
            <label className="new-password">New Password</label>
            <input 
            type="password" 
            id="new-password" 
            value={passwords.new}
            onChange={handleChange}
            name="new"
            required />
          </div>

          <div className="form-group">
          <label className='confirm-password'>Confirm New Password</label>
          <input 
            type="password" 
            name="confirm"
            value={passwords.confirm}
            onChange={handleChange}
            required
          />
        </div>
        {message.text && (
            <div className={`password-change-message ${message.isError ? 'error' : 'success'}`}>
              {message.text}
            </div>
          )}
          <button type="submit">Change Password</button>
         
        </form>
      </div>
    </div>
  )
}

export default UserProfile