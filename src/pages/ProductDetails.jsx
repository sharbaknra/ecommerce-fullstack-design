import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Shield, Globe, ChevronRight } from 'lucide-react'
import { getProducts, getProduct } from '../api'
import { getImage } from '../imageMap'

function StarRating({ rating }) {
  const stars = Math.round(rating / 2)
  return (
    <span className="text-yellow-400 text-sm">
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(null)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const data = await getProduct(id)
      setProduct(data)
      setActiveImg(data.image)
      const all = await getProducts({ category: data.category })
      setRelated(all.filter(p => p._id !== id).slice(0, 6))
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Loading product...</div>
  if (!product) return <div className="text-center py-20 text-gray-400">Product not found.</div>

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-2 text-xs text-gray-500 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight size={12} />
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <ChevronRight size={12} />
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Main product card */}
        <div className="bg-white border rounded p-5 flex flex-col md:flex-row gap-6">

          {/* Image gallery */}
          <div className="flex flex-col gap-3 md:w-72 shrink-0">
            <div className="border rounded p-4 flex items-center justify-center h-64">
              <img src={getImage(activeImg)} alt={product.name} className="h-full object-contain" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[product.image, 'camera', 'laptop', 'smartwatch', 'earphone', 'tablet'].map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(t)}
                  className={`border rounded p-1 w-12 h-12 flex items-center justify-center ${activeImg === t ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <img src={getImage(t)} alt="" className="h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex-1">
            <p className="text-green-500 text-sm font-medium mb-1">✔ In stock ({product.stock} available)</p>
            <h1 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
              <StarRating rating={product.rating} />
              <span className="text-yellow-500 font-semibold">{product.rating}</span>
              <span>• {product.orders} sold</span>
            </div>

            {/* Price tiers */}
            <div className="flex gap-2 mb-4">
              {[
                { price: `$${product.price.toFixed(2)}`, range: '50-100 pcs', active: true },
                { price: `$${(product.price * 0.9).toFixed(2)}`, range: '100-700 pcs' },
                { price: `$${(product.price * 0.8).toFixed(2)}`, range: '700+ pcs' },
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
                { label: 'Category', value: product.category },
                { label: 'Shipping', value: product.shipping },
                { label: 'Stock', value: `${product.stock} units` },
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
          <div className="flex-1 bg-white border rounded">
            <div className="flex border-b text-sm">
              {['description', 'reviews', 'shipping', 'about seller'].map(tab => (
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
                  <p className="mb-3">{product.description}</p>
                  <table className="w-full text-xs border-collapse border border-gray-200 mb-4">
                    <tbody>
                      {[['Category', product.category], ['Stock', product.stock], ['Rating', product.rating], ['Orders', product.orders], ['Shipping', product.shipping]].map(([k, v]) => (
                        <tr key={k} className="border border-gray-200">
                          <td className="px-3 py-2 bg-gray-50 font-medium w-32">{k}</td>
                          <td className="px-3 py-2">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'reviews' && <p>No reviews yet.</p>}
              {activeTab === 'shipping' && <p>Ships worldwide within 5-10 business days. {product.shipping}.</p>}
              {activeTab === 'about seller' && <p>Guanjoi Trading LLC — Verified seller based in Germany, Berlin.</p>}
            </div>
          </div>

          {/* You may like */}
          <div className="md:w-48 shrink-0 bg-white border rounded p-3">
            <h4 className="font-semibold text-sm mb-3">You may like</h4>
            <div className="space-y-3">
              {related.map((item) => (
                <Link to={`/products/${item._id}`} key={item._id} className="flex gap-2 hover:opacity-80">
                  <img src={getImage(item.image)} alt={item.name} className="w-12 h-12 object-contain shrink-0" />
                  <div>
                    <p className="text-xs text-gray-700 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="bg-white border rounded p-4 mt-4">
            <h3 className="font-semibold text-gray-800 mb-3">Related products</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {related.map((p) => (
                <Link to={`/products/${p._id}`} key={p._id} className="text-center hover:opacity-80">
                  <img src={getImage(p.image)} alt={p.name} className="h-20 w-full object-contain mb-2" />
                  <p className="text-xs text-gray-700">{p.name}</p>
                  <p className="text-xs text-gray-400">${p.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

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
