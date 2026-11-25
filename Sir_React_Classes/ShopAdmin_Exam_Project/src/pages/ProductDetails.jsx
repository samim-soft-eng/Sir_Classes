import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { formatCurrency } from '../utils/formatCurrency.jsx'

function ProductDetails() {
  const { products, productState, productError, addToCart, cart } = useStore()
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === Number(productId))
  const added = product && cart.some((item) => item.id === product.id)
  if (productState === 'loading') return <div className="state-message"><span className="spinner" />Loading product...</div>
  if (productState === 'error') return <div className="state-message error-state">{productError}</div>
  if (!product) return <div className="state-message empty-state"><h2>Product not found.</h2><Link to="/products">Back to products</Link></div>

  return (
    <div className="details-page">
      <button className="text-button back-button" onClick={() => navigate('/products')}>← Back to products</button>
      <div className="product-detail panel"><div className="detail-image"><img src={product.image} alt={product.title} /></div><div className="detail-copy"><span className="category-tag">{product.category}</span><h1>{product.title}</h1><p className="detail-rating">★ {product.rating?.rate} <span>({product.rating?.count} reviews)</span></p><p className="detail-price">{formatCurrency(product.price)}</p><p className="detail-description">{product.description}</p><p className="availability"><span /> In stock</p><button className={`button ${added ? 'button-added' : 'button-primary'}`} disabled={added} onClick={() => addToCart(product)}>{added ? '✓ Already in cart' : '＋ Add to cart'}</button></div></div>
    </div>
  )
}

export default ProductDetails
