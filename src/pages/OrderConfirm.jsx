import { Link } from 'react-router-dom'
import { CheckCircle, Package, Truck, Home } from 'lucide-react'

import shirt from '../assets/assets/assets/Layout/alibaba/Image/cloth/shirt.png'
import bag from '../assets/assets/assets/Layout/alibaba/Image/cloth/bag.png'
import jacket from '../assets/assets/assets/Layout/alibaba/Image/cloth/jacket.png'

const orderItems = [
  { id: 1, img: shirt, name: 'T-shirts with multiple colors, for men and lady', size: 'medium', color: 'blue', qty: 9, price: 78.99 },
  { id: 2, img: bag, name: 'T-shirts with multiple colors, for men and lady', size: 'medium', color: 'blue', qty: 3, price: 39.00 },
  { id: 3, img: jacket, name: 'T-shirts with multiple colors, for men and lady', size: 'medium', color: 'blue', qty: 1, price: 170.50 },
]

const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0)
const total = subtotal - 60 + 14

const steps = [
  { icon: CheckCircle, label: 'Order placed', done: true },
  { icon: Package, label: 'Processing', done: false },
  { icon: Truck, label: 'Shipped', done: false },
  { icon: Home, label: 'Delivered', done: false },
]

export default function OrderConfirm() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4">

        {/* Success banner */}
        <div className="bg-white border rounded-lg p-8 text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={36} className="text-green-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Order placed successfully!</h1>
          <p className="text-gray-500 text-sm mb-3">Thank you for your purchase. Your order is being processed.</p>
          <div className="inline-block bg-gray-100 rounded px-4 py-2">
            <span className="text-xs text-gray-500">Order ID: </span>
            <span className="text-sm font-bold text-gray-800">#ORD-2026-84721</span>
          </div>
        </div>

        {/* Tracking steps */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-5">Order status</h2>
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${step.done ? 'bg-green-500' : 'bg-gray-200'}`}>
                      <Icon size={18} className={step.done ? 'text-white' : 'text-gray-400'} />
                    </div>
                    <span className={`text-xs mt-1 font-medium ${step.done ? 'text-green-600' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 mb-5 rounded ${step.done ? 'bg-green-400' : 'bg-gray-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">Estimated delivery: <span className="text-gray-600 font-medium">May 28 – May 31, 2026</span></p>
        </div>

        {/* Order items */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Items ordered</h2>
          <div className="divide-y">
            {orderItems.map(item => (
              <div key={item.id} className="flex gap-4 py-3">
                <img src={item.img} alt={item.name} className="w-14 h-14 object-contain" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">Size: {item.size} · Color: {item.color} · Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t pt-4 mt-2 space-y-1 text-sm">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-500"><span>Discount</span><span className="text-red-500">- $60.00</span></div>
            <div className="flex justify-between text-gray-500"><span>Tax</span><span className="text-green-500">+ $14.00</span></div>
            <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t">
              <span>Total paid</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link to="/products" className="flex-1 text-center border border-blue-600 text-blue-600 py-2 rounded text-sm hover:bg-blue-50 font-medium">
            Continue shopping
          </Link>
          <Link to="/profile" className="flex-1 text-center bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 font-medium">
            View my orders
          </Link>
        </div>

      </div>
    </div>
  )
}
