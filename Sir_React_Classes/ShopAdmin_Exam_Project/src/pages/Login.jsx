import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useStore()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Your password must be at least 6 characters.')
      return
    }
    setUser({ email: email.trim() })
    navigate('/')
  }

  return (
    <main className="login-screen">
      <section className="login-intro">
        <Link className="brand brand-light" to="/login"><span className="brand-mark">S</span> shopadmin</Link>
        <div className="intro-copy">
          <p className="eyebrow">YOUR STORE, IN SYNC</p>
          <h1>Good to see<br />you again.</h1>
          <p>Everything you need to run your shop, all in one place.</p>
        </div>
        <span className="login-footnote">MADE FOR THE WAY YOU WORK</span>
      </section>
      <section className="login-form-wrap">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="mobile-brand"><span className="brand-mark">S</span> shopadmin</div>
          <p className="eyebrow">WELCOME BACK</p>
          <h2>Sign in to your account</h2>
          <p className="muted">Enter your details to access your dashboard.</p>
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary login-button" type="submit">Sign in <span aria-hidden="true">→</span></button>
          <p className="login-hint">Demo app — use any valid email and a 6+ character password.</p>
        </form>
      </section>
    </main>
  )
}

export default Login
