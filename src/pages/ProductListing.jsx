import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, List, Heart, ChevronDown, ChevronUp } from 'lucide-react'
import { getProducts } from '../api'
import { getImage } from '../imageMap'

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
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [activeFilters, setActiveFilters] = useState(['Samsung', 'Apple', 'Poco', 'Metallic'])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState(['Samsung', 'Apple'])
  const [selectedFeatures, setSelectedFeatures] = useState(['Metallic'])
  const [condition, setCondition] = useState('any')

  useEffect(() => {
    fetchProducts()
  }, [search, category])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (category) params.category = category
      const data = await getProducts(params)
      setProducts(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const removeFilter = (f) => setActiveFilters(activeFilters.filter(x => x !== f))
  const toggleBrand = (b) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])
  const toggleFeature = (f) => setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-blue-600">Home</Link> &gt;
        <span className="mx-1">Products</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2 flex gap-4">
        {/* Sidebar */}
        <div className="hidden md:block w-52 shrink-0 bg-white border rounded p-3 h-fit">
          <SidebarSection title="Category">
            <ul className="text-sm text-gray-600 space-y-1">
              {['All', 'Electronics', 'Clothing', 'Home'].map(c => (
                <li key={c}>
                  <button
                    onClick={() => setCategory(c === 'All' ? '' : c)}
                    className={`hover:text-blue-600 ${category === c || (c === 'All' && !category) ? 'text-blue-600 font-medium' : ''}`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="The Sha Stores">
            <ul className="text-sm text-gray-600 space-y-2">
              {brands.map(b => (
                <li key={b} className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="accent-blue-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Features">
            <ul className="text-sm text-gray-600 space-y-2">
              {features.map(f => (
                <li key={f} className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedFeatures.includes(f)} onChange={() => toggleFeature(f)} className="accent-blue-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Price range">
            <div className="px-1">
              <input type="range" min="0" max="999999" className="w-full accent-blue-600" />
              <div className="flex gap-2 mt-2">
                <input type="number" placeholder="Min" className="border rounded px-2 py-1 text-xs w-full focus:outline-none" />
                <input type="number" placeholder="Max" className="border rounded px-2 py-1 text-xs w-full focus:outline-none" />
              </div>
              <button className="mt-2 w-full border border-blue-600 text-blue-600 text-xs py-1 rounded hover:bg-blue-50">Apply</button>
            </div>
          </SidebarSection>

          <SidebarSection title="Condition">
            <ul className="text-sm text-gray-600 space-y-2">
              {['Any', 'Refurbished', 'The Sha Store new', 'Old items'].map(c => (
                <li key={c} className="flex items-center gap-2">
                  <input type="radio" name="condition" checked={condition === c.toLowerCase()} onChange={() => setCondition(c.toLowerCase())} className="accent-blue-600" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Ratings">
            <ul className="space-y-2">
              {[5, 4, 3, 2].map(r => (
                <li key={r} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  <StarRating rating={r * 2} />
                </li>
              ))}
            </ul>
          </SidebarSection>
        </div>

        {/* Main */}
        <div className="flex-1">
          {/* Top bar */}
          <div className="bg-white border rounded p-3 mb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{products.length}</span> items found
              </p>
              <div className="flex items-center gap-3">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-400 w-48"
                />
                <label className="flex items-center gap-1 text-sm text-gray-600">
                  <input type="checkbox" checked={verifiedOnly} onChange={() => setVerifiedOnly(!verifiedOnly)} className="accent-blue-600" />
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

          {/* Loading */}
          {loading && (
            <div className="text-center py-20 text-gray-400">Loading products...</div>
          )}

          {/* Grid view */}
          {!loading && viewMode === 'grid' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(p => (
                <Link to={`/products/${p._id}`} key={p._id} className="bg-white border rounded p-3 hover:shadow-sm">
                  <div className="relative">
                    <img src={getImage(p.image)} alt={p.name} className="h-40 w-full object-contain mb-3" />
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

          {/* List view */}
          {!loading && viewMode === 'list' && (
            <div className="flex flex-col gap-3">
              {products.map(p => (
                <Link to={`/products/${p._id}`} key={p._id} className="bg-white border rounded p-4 flex gap-4 hover:shadow-sm">
                  <img src={getImage(p.image)} alt={p.name} className="h-28 w-28 object-contain shrink-0" />
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
                    <p className="text-xs text-gray-400 mt-1">{p.description}</p>
                    <Link to={`/products/${p._id}`} className="text-blue-600 text-xs mt-1 inline-block hover:underline">View details</Link>
                  </div>
                  <button className="text-gray-300 hover:text-red-400 self-start">
                    <Heart size={16} />
                  </button>
                </Link>
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && products.length === 0 && (
            <div className="text-center py-20 text-gray-400">No products found.</div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 mt-4 text-sm">
            <select className="border rounded px-2 py-1 text-sm focus:outline-none">
              <option>Show 10</option>
              <option>Show 20</option>
            </select>
            <button className="px-2 py-1 border rounded text-gray-500 hover:bg-gray-100">‹</button>
            {[1, 2, 3].map(n => (
              <button key={n} className={`px-3 py-1 border rounded ${n === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{n}</button>
            ))}
            <button className="px-2 py-1 border rounded text-gray-500 hover:bg-gray-100">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
