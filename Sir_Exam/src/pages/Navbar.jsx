import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const Handleclick = () => {
        navigate('/login')
    }

  return (
    <header className="navbar">
      <div className="navbar__identity">
        <h1 className="navbar__brand">ShopAdmin</h1>
        <span className="navbar__welcome">Welcome back to ShopAdmin</span>
      </div>
      <button className="navbar__register" type="button" onClick={() => navigate('/register')}>Register</button>
      <button className="navbar__login" type="button" onClick={Handleclick}>Login</button>
    </header>
  )
}

export default Navbar