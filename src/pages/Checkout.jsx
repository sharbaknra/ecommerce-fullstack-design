import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import shirt from '../assets/assets/assets/Layout/alibaba/Image/cloth/shirt.png'
import bag from '../assets/assets/assets/Layout/alibaba/Image/cloth/bag.png'
import jacket from '../assets/assets/assets/Layout/alibaba/Image/cloth/jacket.png'

const orderItems = [
  { id: 1, img: shirt, name: 'T-shirts with multiple colors', size: 'medium', color: 'blue', qty: 9, price: 78.99 },
  { id: 2, img: bag, name: 'T-shirts with multiple colors', size: 'medium', color: 'blue', qty: 3, price: 39.00 },
  { id: 3, img: jacket, name: 'T-shirts with multiple colors', size: 'medium', color: 'blue', qty: 1, price: 170.50 },
]

const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0)
const discount = 60
const tax = 14
const total = subtotal - discount + tax

export default function Checkout() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: '',
    payMethod: 'card',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Shipping', 'Payment', 'Review'].map((label, i) => {
            const s = i + 1
            const active = step === s
            const done = step > s
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${done ? 'bg-green-500 text-white' : active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {done ? '✓' : s}
                </div>
                <span className={`text-sm font-medium ${active ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
                {i < 2 && <div className="w-12 h-px bg-gray-300 mx-1" />}
              </div>
            )
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left panel */}
          <div className="flex-1">

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-white border rounded p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Shipping information</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[['First name', 'firstName'], ['Last name', 'lastName']].map(([label, key]) => (
                    <div key={key}>
                      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                      <input value={form[key]} onChange={e => set(key, e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                    </div>
                  ))}
                  {[['Email address', 'email'], ['Phone number', 'phone']].map(([label, key]) => (
                    <div key={key}>
                      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                      <input value={form[key]} onChange={e => set(key, e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">Street address</label>
                    <input value={form.address} onChange={e => set('address', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  {[['City', 'city'], ['State', 'state'], ['ZIP code', 'zip'], ['Country', 'country']].map(([label, key]) => (
                    <div key={key}>
                      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                      <input value={form[key]} onChange={e => set(key, e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Link to="/cart" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    <ArrowLeft size={16} /> Back to cart
                  </Link>
                  <button onClick={() => setStep(2)}
                    className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700">
                    Continue to payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white border rounded p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Payment method</h2>

                <div className="flex gap-3 mb-5">
                  {['card', 'paypal', 'cod'].map(method => (
                    <button key={method} onClick={() => set('payMethod', method)}
                      className={`flex-1 border rounded py-2 text-sm font-medium capitalize
                        ${form.payMethod === method ? 'border-blue-600 bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>
                      {method === 'card' ? '💳 Credit card' : method === 'paypal' ? '🅿️ PayPal' : '💵 Cash on delivery'}
                    </button>
                  ))}
                </div>

                {form.payMethod === 'card' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-xs text-gray-500 mb-1 block">Name on card</label>
                      <input value={form.cardName} onChange={e => set('cardName', e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-gray-500 mb-1 block">Card number</label>
                      <input value={form.cardNumber} onChange={e => set('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Expiry date</label>
                      <input value={form.expiry} onChange={e => set('expiry', e.target.value)}
                        placeholder="MM / YY"
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">CVV</label>
                      <input value={form.cvv} onChange={e => set('cvv', e.target.value)}
                        placeholder="···"
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                    </div>
                  </div>
                )}

                {form.payMethod === 'paypal' && (
                  <div className="text-center py-8 text-gray-400 text-sm">You will be redirected to PayPal to complete payment.</div>
                )}

                {form.payMethod === 'cod' && (
                  <div className="text-center py-8 text-gray-400 text-sm">Pay with cash when your order is delivered.</div>
                )}

                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={() => setStep(3)}
                    className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700">
                    Review order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-white border rounded p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Review your order</h2>

                <div className="divide-y mb-4">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex gap-4 py-3">
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-contain" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">Size: {item.size}, Color: {item.color}</p>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                      <p className="font-semibold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded p-4 text-sm space-y-1 mb-4">
                  <p className="font-semibold text-gray-700 mb-2">Shipping to:</p>
                  <p className="text-gray-600">{form.firstName} {form.lastName}</p>
                  <p className="text-gray-600">{form.address}, {form.city}, {form.state} {form.zip}</p>
                  <p className="text-gray-600">{form.country}</p>
                  <p className="text-gray-600">{form.email} · {form.phone}</p>
                </div>

                <div className="bg-gray-50 rounded p-4 text-sm mb-6">
                  <p className="font-semibold text-gray-700 mb-1">Payment:</p>
                  <p className="text-gray-600 capitalize">{form.payMethod === 'card' ? `💳 Card ending in ${form.cardNumber.slice(-4) || '····'}` : form.payMethod === 'paypal' ? '🅿️ PayPal' : '💵 Cash on delivery'}</p>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <Link to="/order-confirm"
                    className="bg-green-500 text-white px-8 py-2 rounded text-sm hover:bg-green-600 font-medium">
                    Place order →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white border rounded p-5 sticky top-4">
              <h3 className="font-semibold text-gray-800 mb-3">Order summary</h3>
              <div className="divide-y mb-4">
                {orderItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 py-2">
                    <img src={item.img} alt={item.name} className="w-10 h-10 object-contain" />
                    <div className="flex-1 text-xs text-gray-600 line-clamp-2">{item.name}</div>
                    <span className="text-xs font-medium">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1 text-sm border-t pt-3">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Discount</span><span className="text-red-500">-${discount.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Tax</span><span className="text-green-500">+${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-gray-800 pt-2 border-t"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
