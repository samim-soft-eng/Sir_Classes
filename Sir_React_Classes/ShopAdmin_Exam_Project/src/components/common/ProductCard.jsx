import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatCurrency.jsx'

function ProductCard({ product, added, onAdd }) {
  return (
    <article className="product-card">
      <Link className="product-image" to={`/products/${product.id}`}><img src={product.image} alt={product.title} loading="lazy" /></Link>
      <div className="product-info"><span className="category-tag">{product.category}</span><Link className="product-title" to={`/products/${product.id}`}>{product.title}</Link><div className="product-meta"><strong>{formatCurrency(product.price)}</strong><span>★ {product.rating?.rate ?? '—'}</span></div><button className={`button ${added ? 'button-added' : 'button-outline'} add-button`} onClick={onAdd} disabled={added}>{added ? '✓ In your cart' : '＋ Add to cart'}</button></div>
    </article>
  )
}

export default ProductCard
