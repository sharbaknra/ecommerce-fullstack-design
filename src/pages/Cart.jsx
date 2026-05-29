import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, MessageSquare, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getImage } from '../imageMap'

const savedItems = []

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, clearCart, cartTotal } = useCart()
  const [coupon, setCoupon] = useState('')

  const discount = 60
  const tax = 14
  const total = cartTotal - discount + tax

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My cart ({cartItems.length})</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
            <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            {/* Cart items */}
            <div className="flex-1">
              <div className="bg-white border rounded divide-y">
                {cartItems.map(item => (
                  <div key={item._id} className="p-4 flex gap-4">
                    <img src={getImage(item.image)} alt={item.name} className="w-16 h-16 object-contain shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Category: {item.category}</p>
                      <p className="text-xs text-gray-400">Seller: Artel Market</p>
                      <div className="flex gap-3 mt-2">
                        <button onClick={() => removeFromCart(item._id)} className="text-xs border border-gray-300 px-2 py-0.5 rounded text-red-500 hover:bg-red-50">Remove</button>
                        <button className="text-xs border border-gray-300 px-2 py-0.5 rounded text-blue-500 hover:bg-blue-50">Save for later</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <p className="font-bold text-gray-800">${item.price.toFixed(2)}</p>
                      <div className="flex items-center border rounded overflow-hidden text-sm">
                        <button onClick={() => updateQty(item._id, item.qty - 1)} className="px-2 py-1 bg-gray-50 hover:bg-gray-100">−</button>
                        <span className="px-3 py-1">{item.qty}</span>
                        <button onClick={() => updateQty(item._id, item.qty + 1)} className="px-2 py-1 bg-gray-50 hover:bg-gray-100">+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-3">
                <Link to="/products" className="flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
                  <ArrowLeft size={16} /> Back to shop
                </Link>
                <button onClick={clearCart} className="text-blue-600 text-sm border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                  Remove all
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-4 bg-white border rounded p-4">
                {[
                  { icon: <Shield size={28} className="text-gray-400" />, title: 'Secure payment', desc: 'Have you ever finally just' },
                  { icon: <MessageSquare size={28} className="text-gray-400" />, title: 'Customer support', desc: 'Have you ever finally just' },
                  { icon: <Truck size={28} className="text-gray-400" />, title: 'Free delivery', desc: 'Have you ever finally just' },
                ].map((b) => (
                  <div key={b.title} className="flex items-center gap-3 flex-1">
                    {b.icon}
                    <div>
                      <p className="text-sm font-medium text-gray-700">{b.title}</p>
                      <p className="text-xs text-gray-400">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div className="md:w-64 shrink-0">
              <div className="bg-white border rounded p-4 mb-3">
                <p className="text-sm font-medium mb-2">Have a coupon?</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Add coupon" value={coupon} onChange={e => setCoupon(e.target.value)}
                    className="border rounded px-2 py-1 text-sm flex-1 focus:outline-none" />
                  <button className="text-blue-600 text-sm font-medium hover:underline">Apply</button>
                </div>
              </div>

              <div className="bg-white border rounded p-4">
                <div className="space-y-2 text-sm border-b pb-3 mb-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount:</span><span className="text-red-500">- ${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax:</span><span className="text-green-500">+ ${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-gray-800 mb-4">
                  <span>Total:</span><span>${total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="block w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 font-medium text-center">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Discount banner */}
        <div className="rounded bg-blue-600 flex items-center justify-between px-8 py-6 mt-6 mb-6">
          <div className="text-white">
            <h3 className="text-lg font-bold">Super discount on more than 100 USD</h3>
            <p className="text-blue-200 text-sm">Have you ever finally just write dummy info</p>
          </div>
          <button className="bg-orange-400 text-white px-5 py-2 rounded hover:bg-orange-500 text-sm font-medium">Shop now</button>
        </div>
      </div>
    </div>
  )
}
