import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import CartSummary from '../components/common/CartSummary.jsx'
import PageHeading from '../components/common/PageHeading.jsx'
import { calculateTotals } from '../utils/cartTotals.jsx'
import { formatCurrency } from '../utils/formatCurrency.jsx'

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useStore()
  const totals = calculateTotals(cart)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <PageHeading eyebrow="YOUR PICKS" title="Shopping cart" description="The things you’ve had your eye on." action={<span className="product-total">{itemCount} items</span>} />
      {!cart.length ? <div className="panel empty-cart"><span className="empty-cart-icon">♧</span><h2>Your cart is empty.</h2><p className="muted">There’s plenty to discover. Find something you love.</p><Link className="button button-primary" to="/products">Continue shopping <span>→</span></Link></div> : (
        <div className="cart-layout"><section className="panel cart-items"><div className="cart-table-heading"><span>PRODUCT</span><span>QUANTITY</span><span>TOTAL</span></div>{cart.map((item) => <div className="cart-row" key={item.id}><div className="cart-product"><img src={item.image} alt="" /><div><Link to={`/products/${item.id}`}>{item.title}</Link><span>{formatCurrency(item.price)} each</span><button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button></div></div><div className="quantity-control"><button aria-label={`Decrease ${item.title} quantity`} onClick={() => updateQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.title} quantity`} onClick={() => updateQuantity(item.id, 1)}>＋</button></div><strong className="item-total">{formatCurrency(item.price * item.quantity)}</strong></div>)}</section><CartSummary totals={totals} /></div>
      )}
    </>
  )
}

export default Cart
