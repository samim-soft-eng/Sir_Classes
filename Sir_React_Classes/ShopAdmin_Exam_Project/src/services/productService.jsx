const PRODUCTS_URL = 'https://fakestoreapi.com/products'

export async function fetchProducts() {
  const response = await fetch(PRODUCTS_URL)
  if (!response.ok) throw new Error(`Product request failed (${response.status}).`)
  const products = await response.json()
  if (!Array.isArray(products)) throw new Error('The product service returned an invalid response.')
  return products
}
