import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleRegister = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name').trim()
    const email = formData.get('email').trim().toLowerCase()
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        if (user?.email?.toLowerCase() === email) {
          setError('An account with this email is already registered.')
          return
        }
      } catch {
        setError('Saved account data is invalid. Please clear it before registering.')
        return
      }

      setError('An account is already saved in this browser.')
      return
    }

    try {
      localStorage.setItem('user', JSON.stringify({ name, email, password }))
    } catch {
      setError('Your account could not be saved in this browser. Please try again.')
      return
    }

    navigate('/login', {
      replace: true,
      state: { message: 'Registration successful. Please log in.' },
    })
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleRegister}>
        <p className="eyebrow">SHOPADMIN</p>
        <h1>Create account</h1>
        <p className="login-card__description">Register to get started with your store.</p>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" autoComplete="name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" autoComplete="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" autoComplete="new-password" minLength="6" required />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" autoComplete="new-password" minLength="6" required />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit">Register</button>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </main>
  )
}

export default Register