import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import CartSummary from '../components/common/CartSummary.jsx'
import FormField from '../components/common/FormField.jsx'
import PageHeading from '../components/common/PageHeading.jsx'
import { calculateTotals } from '../utils/cartTotals.jsx'

function Checkout() {
  const { cart, setCart, setOrders } = useStore()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const totals = calculateTotals(cart)
  if (!cart.length) return <Navigate to="/cart" replace />

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const customer = Object.fromEntries(formData.entries())
    if (!/^\d+$/.test(customer.phone)) {
      setError('Phone number should contain numbers only.')
      return
    }
    if (!/^\d+$/.test(customer.pincode)) {
      setError('Pincode should contain numbers only.')
      return
    }
    const order = { id: `SC-${Date.now().toString().slice(-6)}`, customer, items: cart, total: totals.total, date: new Date().toLocaleDateString(), status: 'Processing' }
    setOrders((previous) => [...previous, order])
    setCart([])
    navigate('/orders', { state: { success: true } })
  }

  return (
    <>
      <PageHeading eyebrow="ALMOST THERE" title="Checkout" description="A few details and these are all yours." />
      <form className="checkout-layout" onSubmit={handleSubmit}><section className="panel checkout-form"><h2>Your details</h2><p className="muted">Where should we send your order?</p><div className="form-grid"><FormField label="Full name" name="name" placeholder="Jane Smith" /><FormField label="Email address" name="email" type="email" placeholder="jane@example.com" /><FormField label="Phone number" name="phone" placeholder="1234567890" /><FormField label="Address" name="address" placeholder="123 Market Street" /><FormField label="City" name="city" placeholder="San Francisco" /><FormField label="Pincode" name="pincode" placeholder="94103" /></div>{error && <p className="form-error" role="alert">{error}</p>}<Link className="text-button checkout-back" to="/cart">← Back to cart</Link></section><CartSummary totals={totals} checkout /></form>
    </>
  )
}

export default Checkout
