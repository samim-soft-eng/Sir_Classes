import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatCurrency.jsx'

function CartSummary({ totals, checkout = false }) {
  return (
    <section className="panel summary-panel">
      <h2>Order summary</h2>
      <div className="summary-line"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
      <div className="summary-line discount-line"><span>Discount <small>5% off</small></span><span>−{formatCurrency(totals.discount)}</span></div>
      <div className="summary-line"><span>Tax <small>8%</small></span><span>{formatCurrency(totals.tax)}</span></div>
      <div className="summary-total"><strong>Total</strong><strong>{formatCurrency(totals.total)}</strong></div>
      {checkout ? <button className="button button-primary full-button" type="submit">Place order <span>→</span></button> : <Link className="button button-primary full-button" to="/checkout">Continue to checkout <span>→</span></Link>}
      <p className="secure-note">✦ Secure checkout · Tax included in total</p>
    </section>
  )
}

export default CartSummary
