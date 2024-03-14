import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const history = useHistory()

  const handleChange = e => {
    const {name, value} = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validateForm = data => {
    const formErrors = {}

    if (!data.username.trim()) {
      formErrors.username = 'Username is required'
    }
    if (!data.password.trim()) {
      formErrors.password = 'Password is required'
    }

    return formErrors
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formErrors = validateForm(formData)
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, check credentials
      if (
        formData.username === 'username' &&
        formData.password === 'password'
      ) {
        // Dummy login successful
        setLoginError('')
        console.log('Login successful')
        // Redirect to Home page
        history.push('/home')
      } else {
        setLoginError('Invalid username or password')
      }
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2 className="heading">Login</h2>
        <div className="make-col">
          <label htmlFor="username" className="label-name">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="input-box"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="make-col">
          <label className="label-name" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-box"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
          {loginError && <div className="error-message">{loginError}</div>}
        </div>
        <button className="custom-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
