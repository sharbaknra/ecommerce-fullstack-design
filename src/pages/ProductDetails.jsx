import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Shield, Globe, ChevronRight } from 'lucide-react'

import camera from '../assets/assets/assets/Image/tech/camera.png'
import earphone from '../assets/assets/assets/Image/tech/earphone.png'
import gamingEarphone from '../assets/assets/assets/Image/tech/gaming earphone.png'
import iphone from '../assets/assets/assets/Image/tech/iphone.png'
import laptop from '../assets/assets/assets/Image/tech/laptop.png'
import smartphone from '../assets/assets/assets/Image/tech/smart phone.png'
import smartwatch from '../assets/assets/assets/Image/tech/smart watches.png'
import tablet from '../assets/assets/assets/Image/tech/tablet.png'
import shirt from '../assets/assets/assets/Layout/alibaba/Image/cloth/shirt.png'
import bag from '../assets/assets/assets/Layout/alibaba/Image/cloth/bag.png'
import jacket from '../assets/assets/assets/Layout/alibaba/Image/cloth/jacket.png'

const thumbnails = [iphone, smartphone, tablet, smartwatch, earphone, camera]

const relatedProducts = [
  { img: tablet, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00' },
  { img: smartwatch, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00' },
  { img: earphone, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00' },
  { img: laptop, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00' },
  { img: camera, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00' },
  { img: gamingEarphone, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00' },
]

const youMayLike = [
  { img: jacket, name: 'Men Blazers Sets Elegant Formal', price: '$7.00 - $99.50' },
  { img: shirt, name: 'Men Shirt Sleeve Polo Contrast', price: '$7.00 - $99.50' },
  { img: smartwatch, name: 'Apple Watch Series Space Gray', price: '$7.00 - $99.50' },
  { img: bag, name: 'Basketball Crew Socks Long Stuff', price: '$7.00 - $99.50' },
  { img: iphone, name: 'New Summer Men\'s castrol T-Shirts', price: '$7.00 - $99.50' },
]

function StarRating({ rating }) {
  const stars = Math.round(rating / 2)
  return (
    <span className="text-yellow-400 text-sm">
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  )
}

export default function ProductDetails() {
  const [activeImg, setActiveImg] = useState(iphone)
  const [activeTab, setActiveTab] = useState('description')

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-2 text-xs text-gray-500 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight size={12} />
        <span>Clothings</span>
        <ChevronRight size={12} />
        <span>Men's wear</span>
        <ChevronRight size={12} />
        <span className="text-gray-800">Summer clothing</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Main product card */}
        <div className="bg-white border rounded p-5 flex flex-col md:flex-row gap-6">

          {/* Image gallery */}
          <div className="flex flex-col gap-3 md:w-72 shrink-0">
            <div className="border rounded p-4 flex items-center justify-center h-64">
              <img src={activeImg} alt="product" className="h-full object-contain" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {thumbnails.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(t)}
                  className={`border rounded p-1 w-12 h-12 flex items-center justify-center ${activeImg === t ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <img src={t} alt="" className="h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex-1">
            <p className="text-green-500 text-sm font-medium mb-1">✔ In stock</p>
            <h1 className="text-xl font-bold text-gray-800 mb-2">Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle</h1>
            <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
              <StarRating rating={9.3} />
              <span className="text-yellow-500 font-semibold">9.3</span>
              <span>• 💬 32 reviews</span>
              <span>• 🏆 154 sold</span>
            </div>

            {/* Price tiers */}
            <div className="flex gap-2 mb-4">
              {[
                { price: '$98.00', range: '50-100 pcs', active: true },
                { price: '$90.00', range: '100-700 pcs' },
                { price: '$78.00', range: '700+ pcs' },
              ].map((tier) => (
                <div key={tier.price} className={`border rounded px-3 py-2 text-sm ${tier.active ? 'border-yellow-400 bg-yellow-50' : ''}`}>
                  <p className={`font-bold ${tier.active ? 'text-red-500' : 'text-gray-800'}`}>{tier.price}</p>
                  <p className="text-xs text-gray-400">{tier.range}</p>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="border-t pt-3 space-y-2 text-sm">
              {[
                { label: 'Price', value: 'Negotiable' },
                { label: 'Type', value: 'Classic shoes' },
                { label: 'Material', value: 'Plastic material' },
                { label: 'Design', value: 'Modern nice' },
                { label: 'Customization', value: 'Customized logo and design custom packages' },
                { label: 'Protection', value: 'Refund Policy' },
                { label: 'Warranty', value: '2 years full warranty' },
              ].map((s) => (
                <div key={s.label} className="flex gap-4">
                  <span className="text-gray-400 w-32 shrink-0">{s.label}:</span>
                  <span className="text-gray-700">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supplier card */}
          <div className="md:w-48 shrink-0">
            <div className="border rounded p-4 text-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-bold">R</div>
                <div>
                  <p className="font-semibold text-xs">Supplier</p>
                  <p className="text-xs text-gray-500">Guanjoi Trading LLC</p>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-500 mb-3">
                <p>🇩🇪 Germany, Berlin</p>
                <p className="flex items-center gap-1"><Shield size={12} className="text-green-500" /> Verified Seller</p>
                <p className="flex items-center gap-1"><Globe size={12} className="text-blue-500" /> Worldwide shipping</p>
              </div>
              <button className="w-full bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-700 mb-2">Send inquiry</button>
              <button className="w-full border border-blue-600 text-blue-600 text-xs py-2 rounded hover:bg-blue-50">Seller's profile</button>
              <button className="flex items-center gap-1 text-xs text-gray-500 mt-3 hover:text-red-500 mx-auto">
                <Heart size={12} /> Save for later
              </button>
            </div>
          </div>
        </div>

        {/* Tabs + You may like */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">

          {/* Tabs */}
          <div className="flex-1 bg-white border rounded">
            <div className="flex border-b text-sm">
              {['description','reviews','shipping','about seller'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 capitalize ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="p-4 text-sm text-gray-600">
              {activeTab === 'description' && (
                <div>
                  <p className="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p className="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <table className="w-full text-xs border-collapse border border-gray-200 mb-4">
                    <tbody>
                      {[['Model','#8786867'],['Style','Classic style'],['Certificate','ISO-898921212'],['Size','34mm x 450mm x 19mm'],['Memory','36GB RAM']].map(([k,v]) => (
                        <tr key={k} className="border border-gray-200">
                          <td className="px-3 py-2 bg-gray-50 font-medium w-32">{k}</td>
                          <td className="px-3 py-2">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ul className="space-y-1 text-xs">
                    {['Some great feature name here','Lorem ipsum dolor sit amet, consectetur','Duis aute irure dolor in reprehenderit','Some great feature name here'].map((f,i) => (
                      <li key={i} className="flex items-center gap-2"><span className="text-gray-400">✓</span>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'reviews' && <p>No reviews yet.</p>}
              {activeTab === 'shipping' && <p>Ships worldwide within 5-10 business days.</p>}
              {activeTab === 'about seller' && <p>Guanjoi Trading LLC — Verified seller based in Germany, Berlin.</p>}
            </div>
          </div>

          {/* You may like */}
          <div className="md:w-48 shrink-0 bg-white border rounded p-3">
            <h4 className="font-semibold text-sm mb-3">You may like</h4>
            <div className="space-y-3">
              {youMayLike.map((item, i) => (
                <Link to={`/products/${i+10}`} key={i} className="flex gap-2 hover:opacity-80">
                  <img src={item.img} alt={item.name} className="w-12 h-12 object-contain shrink-0" />
                  <div>
                    <p className="text-xs text-gray-700 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="bg-white border rounded p-4 mt-4">
          <h3 className="font-semibold text-gray-800 mb-3">Related products</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {relatedProducts.map((p, i) => (
              <Link to={`/products/${i+20}`} key={i} className="text-center hover:opacity-80">
                <img src={p.img} alt={p.name} className="h-20 w-full object-contain mb-2" />
                <p className="text-xs text-gray-700">{p.name}</p>
                <p className="text-xs text-gray-400">{p.price}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Discount banner */}
        <div className="rounded bg-blue-600 flex items-center justify-between px-8 py-6 mt-4 mb-6">
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
