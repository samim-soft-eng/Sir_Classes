import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../services/productService.jsx'
import { readStorage, writeStorage } from '../utils/storage.jsx'

const CART_KEY = 'shopadmin-cart'
const ORDERS_KEY = 'shopadmin-orders'
const USER_KEY = 'shopadmin-user'
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(USER_KEY, null))
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []))
  const [orders, setOrders] = useState(() => readStorage(ORDERS_KEY, []))
  const [products, setProducts] = useState([])
  const [productState, setProductState] = useState('loading')
  const [productError, setProductError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let active = true
    fetchProducts()
      .then((data) => {
        if (active) {
          setProducts(data)
          setProductState('success')
        }
      })
      .catch((error) => {
        console.error('Unable to load products.', error)
        if (active) {
          setProductError('We couldn’t load products. Check your connection and try again.')
          setProductState('error')
        }
      })
    return () => { active = false }
  }, [])

  useEffect(() => writeStorage(CART_KEY, cart), [cart])
  useEffect(() => writeStorage(ORDERS_KEY, orders), [orders])
  useEffect(() => {
    if (user) writeStorage(USER_KEY, user)
    else localStorage.removeItem(USER_KEY)
  }, [user])

  const addToCart = (product) => {
    setCart((items) => items.some((item) => item.id === product.id)
      ? items
      : [...items, { ...product, quantity: 1 }])
  }
  const updateQuantity = (productId, amount) => {
    setCart((items) => items.map((item) => item.id === productId
      ? { ...item, quantity: Math.max(1, item.quantity + amount) }
      : item))
  }
  const removeFromCart = (productId) => setCart((items) => items.filter((item) => item.id !== productId))

  const value = useMemo(() => ({
    user, setUser, cart, setCart, orders, setOrders, products, productState, productError,
    search, setSearch, addToCart, updateQuantity, removeFromCart,
  }), [user, cart, orders, products, productState, productError, search])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used within StoreProvider.')
  return store
}
