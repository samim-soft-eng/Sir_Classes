export function calculateTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = subtotal * 0.05
  const tax = (subtotal - discount) * 0.08
  return { subtotal, discount, tax, total: subtotal - discount + tax }
}
