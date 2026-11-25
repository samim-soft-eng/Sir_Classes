import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import PageHeading from '../components/common/PageHeading.jsx'
import { formatCurrency } from '../utils/formatCurrency.jsx'

function Dashboard() {
  const { products, cart, orders } = useStore()
  const cartValue = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const activities = [
    ...orders.slice(-2).map((order) => ({ icon: '✓', text: `Order ${order.id} placed`, date: order.date })),
    ...cart.slice(-2).map((item) => ({ icon: '+', text: `${item.title} added to cart`, date: 'In your cart now' })),
  ].slice(0, 4)
  return (
    <>
      <PageHeading eyebrow={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()} title="Good morning 👋" description="Here’s what’s happening with your store today." />
      <section className="stats-grid">
        <StatCard label="Total products" value={products.length || '—'} icon="▦" detail="In your catalog" />
        <StatCard label="Cart items" value={cart.reduce((sum, item) => sum + item.quantity, 0)} icon="♧" detail="Items in your cart" />
        <StatCard label="Cart value" value={formatCurrency(cartValue)} icon="$" detail="Before taxes & discounts" />
        <StatCard label="Total orders" value={orders.length} icon="▤" detail="Orders placed" />
      </section>
      <section className="dashboard-panels">
        <div className="panel activity-panel">
          <div className="panel-heading"><div><h2>Recent activity</h2><p className="muted">A little movement in your store</p></div><span className="live-dot">● Live</span></div>
          {activities.length ? <ul className="activity-list">{activities.map((item, index) => <li key={`${item.text}-${index}`}><span className="activity-icon">{item.icon}</span><div><strong>{item.text}</strong><small>{item.date}</small></div></li>)}</ul> : <div className="empty-inline"><span>✦</span><p>Your store is all caught up.</p><Link to="/products">Browse products →</Link></div>}
        </div>
        <div className="panel quick-panel"><span className="quick-icon">✳</span><p className="eyebrow">READY WHEN YOU ARE</p><h2>Find your next favorite.</h2><p className="muted">Explore the catalog and add a little something to your cart.</p><Link className="button button-primary" to="/products">Explore products <span>→</span></Link></div>
      </section>
    </>
  )
}

function StatCard({ label, value, icon, detail }) {
  return <article className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-icon">{icon}</span></div><strong className="stat-value">{value}</strong><span className="stat-detail">{detail}</span></article>
}

export default Dashboard
