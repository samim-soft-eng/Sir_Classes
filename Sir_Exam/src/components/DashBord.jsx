import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function DashBord() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [activeSection, setActiveSection] = useState('Dashboard')
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')
    const [storageError, setStorageError] = useState('')
    const userName = localStorage.getItem('currentUser') || 'ShopAdmin User'
    const initials = userName.trim().slice(0, 1).toUpperCase() || 'U'

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get('https://fakestoreapi.com/products')
                setProducts(res.data)
            } catch {
                setError('Products could not be loaded. Please try again later.')
            }
        }

        getProducts()

        try {
            const storedCart = localStorage.getItem('cart')
            const storedOrders = localStorage.getItem('orders')
            const parsedCart = storedCart ? JSON.parse(storedCart) : []
            const parsedOrders = storedOrders ? JSON.parse(storedOrders) : []

            if (!Array.isArray(parsedCart) || !Array.isArray(parsedOrders)) {
                throw new Error('Cart and orders must be stored as lists.')
            }

            setCart(parsedCart)
            setOrders(parsedOrders)
        } catch {
            setStorageError('Cart and order summaries could not be read from saved data.')
        }
    }, [])

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase()
        if (!query) return products
        return products.filter((product) => product.title.toLowerCase().includes(query))
    }, [products, search])

    const cartItems = cart.reduce((total, item) => {
        const quantity = Number(item.quantity ?? 1)
        return total + (Number.isFinite(quantity) && quantity > 0 ? quantity : 0)
    }, 0)

    const cartValue = cart.reduce((total, item) => {
        const price = Number(item.price)
        const quantity = Number(item.quantity ?? 1)
        return total + (Number.isFinite(price) && price >= 0 && Number.isFinite(quantity) && quantity > 0
            ? price * quantity
            : 0)
    }, 0)

    const logout = () => {
        localStorage.removeItem('login')
        localStorage.removeItem('currentUser')
        navigate('/login', { replace: true })
    }

    const sections = [
        { label: 'Dashboard', icon: '▦' },
        { label: 'Products', icon: '◇' },
        { label: 'Cart', icon: '▣' },
        { label: 'Orders', icon: '↻' },
        { label: 'Profile', icon: '●' },
    ]

    const summaryCards = [
        { label: 'Total Products', value: products.length, icon: '◇', tone: 'violet' },
        { label: 'Cart Items', value: cartItems, icon: '▣', tone: 'blue' },
        { label: 'Total Cart Value', value: `$${cartValue.toFixed(2)}`, icon: '$', tone: 'green' },
        { label: 'Total Orders', value: orders.length, icon: '↻', tone: 'orange' },
    ]

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <a className="dashboard-brand" href="/dashboard">ShopAdmin</a>
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>
        <div className="dashboard-account">
          <div className="account-details">
            <span className="account-name">{userName}</span>
            <span className="account-role">Administrator</span>
          </div>
          <span className="account-avatar" aria-hidden="true">{initials}</span>
          <button className="logout-button" type="button" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="dashboard-sidebar" aria-label="Main navigation">
          <p className="sidebar-heading">MENU</p>
          <nav className="sidebar-nav">
            {sections.map((section) => (
              <button
                className={`sidebar-link${activeSection === section.label ? ' is-active' : ''}`}
                type="button"
                key={section.label}
                aria-current={activeSection === section.label ? 'page' : undefined}
                onClick={() => setActiveSection(section.label)}
              >
                <span className="sidebar-icon" aria-hidden="true">{section.icon}</span>
                {section.label}
                {section.label === 'Cart' && cartItems > 0 && (
                  <span className="sidebar-count">{cartItems}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span className="sidebar-footer__mark">S</span>
            <span><strong>ShopAdmin</strong><small>Store management</small></span>
          </div>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-title">
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h1>{activeSection === 'Dashboard' ? 'Dashboard' : activeSection}</h1>
              <p className="dashboard-subtitle">Welcome back, {userName}. Here&apos;s your store at a glance.</p>
            </div>
            <span className="date-chip">{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>

          {storageError && <p className="dashboard-alert" role="alert">{storageError}</p>}

          {activeSection === 'Dashboard' && (
            <section aria-label="Store summary">
              <div className="summary-grid">
                {summaryCards.map((card) => (
                  <article className="summary-card" key={card.label}>
                    <span className={`summary-icon summary-icon--${card.tone}`} aria-hidden="true">{card.icon}</span>
                    <p className="summary-label">{card.label}</p>
                    <p className="summary-value">{card.value}</p>
                    <p className="summary-caption">Current store overview</p>
                  </article>
                ))}
              </div>
              <section className="content-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Products</h2>
                    <p>Browse the products available in your store.</p>
                  </div>
                  <button className="text-button" type="button" onClick={() => setActiveSection('Products')}>View all</button>
                </div>
                {error && <p className="dashboard-alert" role="alert">{error}</p>}
                <ProductGrid products={filteredProducts.slice(0, 4)} />
              </section>
            </section>
          )}

          {activeSection === 'Products' && (
            <section className="content-panel">
              <div className="panel-heading">
                <div>
                  <h2>All Products</h2>
                  <p>{filteredProducts.length} products found</p>
                </div>
              </div>
              {error && <p className="dashboard-alert" role="alert">{error}</p>}
              <ProductGrid products={filteredProducts} />
            </section>
          )}

          {activeSection === 'Cart' && (
            <section className="content-panel section-empty">
              <h2>Your cart</h2>
              <p>{cartItems} items · ${cartValue.toFixed(2)} total</p>
              {cart.length === 0 && <p>Your cart is currently empty.</p>}
            </section>
          )}

          {activeSection === 'Orders' && (
            <section className="content-panel section-empty">
              <h2>Orders</h2>
              <p>{orders.length === 0 ? 'You have no orders yet.' : `${orders.length} orders in your order history.`}</p>
            </section>
          )}

          {activeSection === 'Profile' && (
            <section className="content-panel section-empty">
              <span className="account-avatar account-avatar--large" aria-hidden="true">{initials}</span>
              <h2>{userName}</h2>
              <p>Administrator</p>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

function ProductGrid({ products }) {
    if (products.length === 0) {
        return <p className="empty-products">No products match your search.</p>
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <article className="product-card" key={product.id}>
                    <div className="product-image-wrap">
                        <img className="product-card__image" src={product.image} alt={product.title} loading="lazy" />
                    </div>
                    <h3>{product.title}</h3>
                    <p className="product-price">${Number(product.price).toFixed(2)}</p>
                </article>
            ))}
        </div>
    )
}

export default DashBord