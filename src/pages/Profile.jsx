import { useState } from 'react'
import { Package, Heart, Settings, LogOut, ChevronRight, Star } from 'lucide-react'

import shirt from '../assets/assets/assets/Layout/alibaba/Image/cloth/shirt.png'
import bag from '../assets/assets/assets/Layout/alibaba/Image/cloth/bag.png'
import jacket from '../assets/assets/assets/Layout/alibaba/Image/cloth/jacket.png'
import smartwatch from '../assets/assets/assets/Image/tech/smart watches.png'
import laptop from '../assets/assets/assets/Image/tech/laptop.png'

const orders = [
  {
    id: '#ORD-2026-84721', date: 'May 24, 2026', status: 'Processing', total: 952.41,
    items: [
      { img: shirt, name: 'T-shirts with multiple colors', qty: 9, price: 78.99 },
      { img: bag, name: 'Bag with multiple colors', qty: 3, price: 39.00 },
      { img: jacket, name: 'Jacket for men', qty: 1, price: 170.50 },
    ]
  },
  {
    id: '#ORD-2026-71032', date: 'May 10, 2026', status: 'Delivered', total: 199.00,
    items: [
      { img: smartwatch, name: 'Smart watch series 6', qty: 1, price: 199.00 },
    ]
  },
  {
    id: '#ORD-2026-60418', date: 'April 28, 2026', status: 'Delivered', total: 349.00,
    items: [
      { img: laptop, name: 'Laptop pro 15 inch', qty: 1, price: 349.00 },
    ]
  },
]

const statusColor = {
  Processing: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
}

const tabs = [
  { key: 'orders', label: 'My Orders', icon: Package },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'settings', label: 'Settings', icon: Settings },
]

export default function Profile() {
  const [tab, setTab] = useState('orders')
  const [expanded, setExpanded] = useState(null)
  const { user } = useAuth()
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '', phone: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar */}
          <div className="md:w-60 shrink-0">
            <div className="bg-white border rounded-lg p-5 mb-4 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-2">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <p className="font-semibold text-gray-800">{form.firstName} {form.lastName}</p>
              <p className="text-xs text-gray-400">{form.email}</p>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button key={key} onClick={() => setTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium border-b last:border-0
                    ${tab === key ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Icon size={16} />
                  {label}
                  <ChevronRight size={14} className="ml-auto text-gray-300" />
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50">
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">

            {/* Orders tab */}
            {tab === 'orders' && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">My Orders</h2>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white border rounded-lg overflow-hidden">
                      {/* Order header */}
                      <div className="flex items-center justify-between px-5 py-4 border-b">
                        <div>
                          <p className="text-sm font-bold text-gray-800">{order.id}</p>
                          <p className="text-xs text-gray-400">{order.date} · {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[order.status]}`}>
                            {order.status}
                          </span>
                          <p className="font-bold text-gray-800">${order.total.toFixed(2)}</p>
                          <button onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                            className="text-blue-600 text-xs hover:underline">
                            {expanded === order.id ? 'Hide' : 'Details'}
                          </button>
                        </div>
                      </div>

                      {/* Order items (expanded) */}
                      {expanded === order.id && (
                        <div className="divide-y px-5">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 py-3">
                              <img src={item.img} alt={item.name} className="w-12 h-12 object-contain" />
                              <div className="flex-1">
                                <p className="text-sm text-gray-800 font-medium">{item.name}</p>
                                <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                              </div>
                              <p className="text-sm font-semibold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
                              {order.status === 'Delivered' && (
                                <button className="flex items-center gap-1 text-xs text-yellow-500 border border-yellow-300 px-2 py-1 rounded hover:bg-yellow-50">
                                  <Star size={12} /> Review
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist tab */}
            {tab === 'wishlist' && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Wishlist</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { img: smartwatch, name: 'Smart Watch Series 6', price: 199.00 },
                    { img: laptop, name: 'Laptop Pro 15 inch', price: 349.00 },
                    { img: jacket, name: 'Jacket for men', price: 170.50 },
                  ].map((item, i) => (
                    <div key={i} className="bg-white border rounded-lg p-4">
                      <img src={item.img} alt={item.name} className="h-28 w-full object-contain mb-3" />
                      <p className="text-sm font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.name}</p>
                      <button className="w-full bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700">
                        Add to cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings tab */}
            {tab === 'settings' && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Account Settings</h2>
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold text-gray-700 mb-4">Personal information</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[['First name', 'firstName'], ['Last name', 'lastName'], ['Email address', 'email'], ['Phone number', 'phone']].map(([label, key]) => (
                      <div key={key}>
                        <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                        <input value={form[key]} onChange={e => set(key, e.target.value)}
                          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-gray-700 mb-4 border-t pt-4">Change password</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {['Current password', 'New password', 'Confirm new password'].map(label => (
                      <div key={label} className={label === 'Current password' ? 'col-span-2' : ''}>
                        <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                        <input type="password" placeholder="••••••••"
                          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                      </div>
                    ))}
                  </div>

                  <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 font-medium">
                    Save changes
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
