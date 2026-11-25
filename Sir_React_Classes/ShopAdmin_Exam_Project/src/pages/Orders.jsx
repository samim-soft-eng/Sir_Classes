import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PageHeading from '../components/common/PageHeading.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { formatCurrency } from '../utils/formatCurrency.jsx'

function Orders() {
  const { orders } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedOrder, setSelectedOrder] = useState(null)

  return (
    <>
      <PageHeading eyebrow="YOUR PURCHASES" title="Orders" description="All your orders, right where you left them." />
      {location.state?.success && <div className="success-banner" role="status"><span>✓</span><div><strong>Order placed — nice choice!</strong><p>Your order has been saved. You can find it here anytime.</p></div><button aria-label="Dismiss message" onClick={() => navigate('/orders', { replace: true, state: null })}>×</button></div>}
      {!orders.length ? <div className="panel empty-cart"><span className="empty-cart-icon">▤</span><h2>No orders just yet.</h2><p className="muted">Your next great find is just around the corner.</p><Link className="button button-primary" to="/products">Browse products <span>→</span></Link></div> : <section className="panel orders-panel"><div className="orders-table-head"><span>ORDER</span><span>DATE</span><span>STATUS</span><span>TOTAL</span><span /></div>{[...orders].reverse().map((order) => <div className="order-row" key={order.id}><div><strong>{order.id}</strong><small>{order.customer.name}</small></div><span>{order.date}</span><span><i className="status-pill">{order.status}</i></span><strong>{formatCurrency(order.total)}</strong><button className="text-button" onClick={() => setSelectedOrder(order)}>View details →</button></div>)}</section>}
      {selectedOrder && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedOrder(null)}><section className="panel order-modal" role="dialog" aria-modal="true" aria-labelledby="order-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close details" onClick={() => setSelectedOrder(null)}>×</button><p className="eyebrow">ORDER DETAILS</p><h2 id="order-modal-title">{selectedOrder.id}</h2><p className="muted">{selectedOrder.customer.name} · {selectedOrder.date}</p><ul>{selectedOrder.items.map((item) => <li key={item.id}><span>{item.title} × {item.quantity}</span><strong>{formatCurrency(item.price * item.quantity)}</strong></li>)}</ul><div className="summary-total"><strong>Total</strong><strong>{formatCurrency(selectedOrder.total)}</strong></div></section></div>}
    </>
  )
}

export default Orders
