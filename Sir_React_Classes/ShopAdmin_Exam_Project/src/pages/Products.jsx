import { useMemo, useState } from 'react'
import { useStore } from '../context/StoreContext.jsx'
import PageHeading from '../components/common/PageHeading.jsx'
import ProductCard from '../components/common/ProductCard.jsx'

function Products() {
  const { products, productState, productError, search, setSearch, addToCart, cart } = useStore()
  const [category, setCategory] = useState('All categories')
  const [sort, setSort] = useState('featured')
  const categories = useMemo(() => ['All categories', ...new Set(products.map((product) => product.category))], [products])
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()) && (category === 'All categories' || product.category === category))
    if (sort === 'low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'high') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [products, search, category, sort])

  return (
    <>
      <PageHeading eyebrow="THE CATALOG" title="Products" description="A few good things, all in one place." action={<span className="product-total">{products.length} products</span>} />
      <div className="product-controls">
        <label className="search-field"><span aria-hidden="true">⌕</span><input aria-label="Search catalog" placeholder="Find something..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        <select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
        <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Sort: Featured</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option></select>
      </div>
      {productState === 'loading' && <div className="state-message"><span className="spinner" />Finding the good stuff...</div>}
      {productState === 'error' && <div className="state-message error-state">{productError}</div>}
      {productState === 'success' && visibleProducts.length === 0 && <div className="state-message empty-state"><span>⌕</span><h2>No products found.</h2><p>Try a different search or category.</p></div>}
      {productState === 'success' && visibleProducts.length > 0 && <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} added={cart.some((item) => item.id === product.id)} onAdd={() => addToCart(product)} />)}</div>}
    </>
  )
}

export default Products
