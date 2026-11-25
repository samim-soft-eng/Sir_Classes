import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'

const navItems = [
  { to: '/', label: 'Overview', icon: '⌂', end: true },
  { to: '/products', label: 'Products', icon: '▦' },
  { to: '/cart', label: 'Cart', icon: '♧' },
  { to: '/orders', label: 'Orders', icon: '▤' },
  { to: '/profile', label: 'Profile', icon: '○' },
]

function DashboardLayout() {
  const { user, cart, search, setSearch, setUser } = useStore()
  const navigate = useNavigate()
  const name = user.email.split('@')[0]
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const onLogout = () => {
    setUser(null)
    navigate('/login')
  }
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/"><span className="brand-mark">S</span> shopadmin</Link>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}
              {item.label === 'Cart' && cartCount > 0 && <span className="nav-count">{cartCount}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-user"><span className="avatar">{name.slice(0, 1).toUpperCase()}</span><div><strong>{name}</strong><small>Store admin</small></div></div>
          <button className="logout-button" onClick={onLogout}><span aria-hidden="true">↪</span> Sign out</button>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand"><Link className="brand" to="/"><span className="brand-mark">S</span> shopadmin</Link></div>
          <label className="global-search"><span aria-hidden="true">⌕</span><input aria-label="Search products" placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>⌘ K</kbd></label>
          <div className="topbar-user"><span className="avatar">{name.slice(0, 1).toUpperCase()}</span><span>{name}</span></div>
        </header>
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  )
}

export default DashboardLayout
