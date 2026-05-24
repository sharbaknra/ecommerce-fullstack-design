import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, List, Heart, ChevronDown, ChevronUp } from 'lucide-react'

import camera from '../assets/assets/assets/Image/tech/camera.png'
import earphone from '../assets/assets/assets/Image/tech/earphone.png'
import gamingEarphone from '../assets/assets/assets/Image/tech/gaming earphone.png'
import iphone from '../assets/assets/assets/Image/tech/iphone.png'
import laptop from '../assets/assets/assets/Image/tech/laptop.png'
import smartphone from '../assets/assets/assets/Image/tech/smart phone.png'
import smartwatch from '../assets/assets/assets/Image/tech/smart watches.png'
import tablet from '../assets/assets/assets/Image/tech/tablet.png'

const products = [
  { id: 1, img: iphone, name: 'Canon Cmera EOS 2000, Black 10x zoom', price: 99.50, oldPrice: 112.00, rating: 7.5, orders: 154, shipping: 'Free Shipping' },
  { id: 2, img: smartphone, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 112.00, rating: 7.5, orders: 154, shipping: 'Free Shipping' },
  { id: 3, img: tablet, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 112.00, rating: 7.5, orders: 154, shipping: 'Free Shipping' },
  { id: 4, img: laptop, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 112.00, rating: 7.5, orders: 154, shipping: 'Free Shipping' },
  { id: 5, img: camera, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 112.00, rating: 7.5, orders: 154, shipping: 'Free Shipping' },
  { id: 6, img: smartwatch, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 112.00, rating: 7.5, orders: 154, shipping: 'Free Shipping' },
  { id: 7, img: earphone, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 112.00, rating: 7.5, orders: 154, shipping: 'Free Shipping' },
  { id: 8, img: gamingEarphone, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 112.00, rating: 7.5, orders: 154, shipping: 'Free Shipping' },
  { id: 9, img: iphone, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 112.00, rating: 5.9, orders: 154, shipping: 'Free Shipping' },
]

const brands = ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo']
const features = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']

function StarRating({ rating }) {
  const stars = Math.round(rating / 2)
  return (
    <span className="text-yellow-400 text-xs">
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  )
}

function SidebarSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b py-3">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-2">
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && children}
    </div>
  )
}

export default function ProductListing() {
  const [viewMode, setViewMode] = useState('grid')
  const [activeFilters, setActiveFilters] = useState(['Samsung', 'Apple', 'Poco', 'Metallic', '4 star', '3 star'])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState(['Samsung', 'Apple', 'Pocco'])
  const [selectedFeatures, setSelectedFeatures] = useState(['Metallic'])
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(999999)
  const [condition, setCondition] = useState('any')

  const removeFilter = (f) => setActiveFilters(activeFilters.filter(x => x !== f))

  const toggleBrand = (b) => {
    setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])
  }

  const toggleFeature = (f) => {
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-blue-600">Home</Link> &gt;
        <span className="mx-1">Clothings</span> &gt;
        <span className="mx-1">Men's wear</span> &gt;
        <span className="mx-1 text-gray-800">Summer clothing</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2 flex gap-4">

        {/* Sidebar */}
        <div className="hidden md:block w-52 shrink-0 bg-white border rounded p-3 h-fit">

          <SidebarSection title="Category">
            <ul className="text-sm text-gray-600 space-y-1">
              {['Mobile accessory','Electronics','Smartphones','Modern tech'].map(c => (
                <li key={c} className="flex justify-between items-center">
                  <Link to="#" className="hover:text-blue-600">{c}</Link>
                </li>
              ))}
              <li><Link to="#" className="text-blue-600 text-xs">See all</Link></li>
            </ul>
          </SidebarSection>

          <SidebarSection title="Brands">
            <ul className="text-sm text-gray-600 space-y-2">
              {brands.map(b => (
                <li key={b} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => toggleBrand(b)}
                    className="accent-blue-600"
                  />
                  <span>{b}</span>
                </li>
              ))}
              <li><Link to="#" className="text-blue-600 text-xs">See all</Link></li>
            </ul>
          </SidebarSection>

          <SidebarSection title="Features">
            <ul className="text-sm text-gray-600 space-y-2">
              {features.map(f => (
                <li key={f} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(f)}
                    onChange={() => toggleFeature(f)}
                    className="accent-blue-600"
                  />
                  <span>{f}</span>
                </li>
              ))}
              <li><Link to="#" className="text-blue-600 text-xs">See all</Link></li>
            </ul>
          </SidebarSection>

          <SidebarSection title="Price range">
            <div className="px-1">
              <input type="range" min="0" max="999999" className="w-full accent-blue-600" />
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={e => setPriceMin(e.target.value)}
                  className="border rounded px-2 py-1 text-xs w-full focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={e => setPriceMax(e.target.value)}
                  className="border rounded px-2 py-1 text-xs w-full focus:outline-none"
                />
              </div>
              <button className="mt-2 w-full border border-blue-600 text-blue-600 text-xs py-1 rounded hover:bg-blue-50">Apply</button>
            </div>
          </SidebarSection>

          <SidebarSection title="Condition">
            <ul className="text-sm text-gray-600 space-y-2">
              {['Any','Refurbished','Brand new','Old items'].map(c => (
                <li key={c} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="condition"
                    checked={condition === c.toLowerCase()}
                    onChange={() => setCondition(c.toLowerCase())}
                    className="accent-blue-600"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Ratings">
            <ul className="space-y-2">
              {[5,4,3,2].map(r => (
                <li key={r} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  <StarRating rating={r * 2} />
                </li>
              ))}
            </ul>
          </SidebarSection>

        </div>

        {/* Main content */}
        <div className="flex-1">

          {/* Top bar */}
          <div className="bg-white border rounded p-3 mb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">12,911</span> items in <span className="font-semibold">Mobile accessory</span>
              </p>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={() => setVerifiedOnly(!verifiedOnly)}
                    className="accent-blue-600"
                  />
                  Verified only
                </label>
                <select className="border rounded px-2 py-1 text-sm text-gray-600 focus:outline-none">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400'}`}>
                  <Grid size={18} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1 rounded ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-400'}`}>
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Active filters */}
            <div className="flex flex-wrap gap-2 mt-2">
              {activeFilters.map(f => (
                <span key={f} className="flex items-center gap-1 border rounded px-2 py-0.5 text-xs text-gray-600">
                  {f}
                  <button onClick={() => removeFilter(f)} className="text-gray-400 hover:text-red-500">×</button>
                </span>
              ))}
              {activeFilters.length > 0 && (
                <button onClick={() => setActiveFilters([])} className="text-blue-600 text-xs hover:underline">Clear all filter</button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(p => (
                <Link to={`/products/${p.id}`} key={p.id} className="bg-white border rounded p-3 hover:shadow-sm">
                  <div className="relative">
                    <img src={p.img} alt={p.name} className="h-40 w-full object-contain mb-3" />
                    <button className="absolute top-1 right-1 text-gray-300 hover:text-red-400">
                      <Heart size={16} />
                    </button>
                  </div>
                  <p className="font-bold text-gray-800">${p.price.toFixed(2)}</p>
                  {p.oldPrice && <p className="text-xs text-gray-400 line-through">${p.oldPrice.toFixed(2)}</p>}
                  <div className="flex items-center gap-1 mt-1">
                    <StarRating rating={p.rating} />
                    <span className="text-xs text-gray-500">{p.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{p.name}</p>
                </Link>
              ))}
            </div>
          )}

          {/* Products List */}
          {viewMode === 'list' && (
            <div className="flex flex-col gap-3">
              {products.map(p => (
                <Link to={`/products/${p.id}`} key={p.id} className="bg-white border rounded p-4 flex gap-4 hover:shadow-sm">
                  <img src={p.img} alt={p.name} className="h-28 w-28 object-contain shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-lg">${p.price.toFixed(2)}</p>
                    {p.oldPrice && <p className="text-xs text-gray-400 line-through">${p.oldPrice.toFixed(2)}</p>}
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={p.rating} />
                      <span className="text-xs text-gray-500">{p.rating}</span>
                      <span className="text-xs text-gray-400">• {p.orders} orders</span>
                      <span className="text-xs text-green-500">• {p.shipping}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{p.name}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    <Link to={`/products/${p.id}`} className="text-blue-600 text-xs mt-1 inline-block hover:underline">View details</Link>
                  </div>
                  <button className="text-gray-300 hover:text-red-400 self-start">
                    <Heart size={16} />
                  </button>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 mt-4 text-sm">
            <select className="border rounded px-2 py-1 text-sm focus:outline-none">
              <option>Show 10</option>
              <option>Show 20</option>
            </select>
            <button className="px-2 py-1 border rounded text-gray-500 hover:bg-gray-100">‹</button>
            {[1,2,3].map(n => (
              <button key={n} className={`px-3 py-1 border rounded ${n === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{n}</button>
            ))}
            <button className="px-2 py-1 border rounded text-gray-500 hover:bg-gray-100">›</button>
          </div>

        </div>
      </div>
    </div>
  )
}
