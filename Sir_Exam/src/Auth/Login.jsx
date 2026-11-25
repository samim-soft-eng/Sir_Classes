import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const savedUser = localStorage.getItem('user')

        if (!savedUser) {
            setError('No saved account was found. Please register first.')
            return
        }

        let user
        try {
            user = JSON.parse(savedUser)
        } catch {
            setError('Saved account data is invalid. Please register again.')
            return
        }

        if (
            !user ||
            typeof user !== 'object' ||
            Array.isArray(user) ||
            typeof user.email !== 'string' ||
            typeof user.password !== 'string'
        ) {
            setError('Saved account data is invalid. Please register again.')
            return
        }

        if (user.email !== email || user.password !== password) {
            setError('Email or password does not match.')
            return
        }

        localStorage.setItem('currentUser', user.name || user.email)
        localStorage.setItem('login', 'true')
        navigate('/dashboard')
    }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <p className="eyebrow">SHOPADMIN</p>
        <h1>Welcome back</h1>
        <p className="login-card__description">Sign in to continue to your dashboard.</p>
        {location.state?.message && <p className="form-success" role="status">{location.state.message}</p>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" autoComplete="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" autoComplete="current-password" required />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit">Login</button>
        <p className="auth-switch">Don&apos;t have an account? <Link to="/register">Register</Link></p>
      </form>
    </main>
  )
}

export default Login