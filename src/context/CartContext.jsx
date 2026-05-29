import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Load from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setCartItems(JSON.parse(saved))
  }, [])

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i._id === product._id)
      if (existing) {
        return prev.map(i => i._id === product._id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...product, qty }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i._id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) return
    setCartItems(prev => prev.map(i => i._id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
