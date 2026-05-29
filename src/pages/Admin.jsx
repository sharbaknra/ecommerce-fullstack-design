import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getImage } from '../imageMap'

const BASE_URL = 'http://localhost:5000/api'

const emptyForm = {
  name: '', price: '', oldPrice: '', image: 'camera',
  description: '', category: 'Electronics', stock: '', featured: false
}

const imageOptions = [
  'camera','earphone','electricKettle','gamingEarphone','iphone',
  'laptop','smartphone','smartwatch','tablet','bag','blazerCoat',
  'shirt','shortJeans','wallet','sofa'
]

export default function Admin() {
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [tab, setTab] = useState('products')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login')
      return
    }
    fetchProducts()
    fetchUsers()
  }, [user])

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const fetchProducts = async () => {
    const res = await fetch(`${BASE_URL}/admin/products`, { headers: authHeaders })
    const data = await res.json()
    setProducts(data)
  }

  const fetchUsers = async () => {
    const res = await fetch(`${BASE_URL}/admin/users`, { headers: authHeaders })
    const data = await res.json()
    setUsers(data)
  }

  const handleSubmit = async () => {
    setError('')
    if (!form.name || !form.price || !form.category) {
      return setError('Name, price and category are required')
    }
    try {
      const url = editId
        ? `${BASE_URL}/admin/products/${editId}`
        : `${BASE_URL}/admin/products`
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
          stock: parseInt(form.stock) || 0,
        })
      })
      if (!res.ok) {
        const data = await res.json()
        return setError(data.error)
      }
      setSuccess(editId ? 'Product updated!' : 'Product created!')
      setShowForm(false)
      setEditId(null)
      setForm(emptyForm)
      fetchProducts()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Server error')
    }
  }

  const handleEdit = (p) => {
    setForm({
      name: p.name, price: p.price, oldPrice: p.oldPrice || '',
      image: p.image, description: p.description, category: p.category,
      stock: p.stock, featured: p.featured
    })
    setEditId(p._id)
    setShowForm(true)
    setError('')
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: 'DELETE', headers: authHeaders
    })
    setSuccess('Product deleted!')
    fetchProducts()
    setTimeout(() => setSuccess(''), 3000)
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <div className="flex gap-2">
            <button onClick={() => setTab('products')}
              className={`px-4 py-2 rounded text-sm font-medium ${tab === 'products' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600'}`}>
              Products
            </button>
            <button onClick={() => setTab('users')}
              className={`px-4 py-2 rounded text-sm font-medium ${tab === 'users' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600'}`}>
              Users
            </button>
          </div>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-2 rounded mb-4 flex items-center gap-2">
            <Check size={16} /> {success}
          </div>
        )}

        {/* Products Tab */}
        {tab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 text-sm">{products.length} products total</p>
              <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); setError('') }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                <Plus size={16} /> Add Product
              </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-white border rounded p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-800">{editId ? 'Edit Product' : 'Add New Product'}</h2>
                  <button onClick={() => { setShowForm(false); setEditId(null) }} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded mb-4">{error}</div>}

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">Product Name *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Price *</label>
                    <input type="number" value={form.price} onChange={e => set('price', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Old Price</label>
                    <input type="number" value={form.oldPrice} onChange={e => set('oldPrice', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Category *</label>
                    <select value={form.category} onChange={e => set('category', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Home</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Stock</label>
                    <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Image</label>
                    <select value={form.image} onChange={e => set('image', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                      {imageOptions.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)}
                      className="accent-blue-600" id="featured" />
                    <label htmlFor="featured" className="text-sm text-gray-600">Featured product</label>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">Description</label>
                    <textarea value={form.description} onChange={e => set('description', e.target.value)}
                      rows={3} className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none" />
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button onClick={handleSubmit}
                    className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 font-medium">
                    {editId ? 'Update Product' : 'Create Product'}
                  </button>
                  <button onClick={() => { setShowForm(false); setEditId(null) }}
                    className="border text-gray-600 px-6 py-2 rounded text-sm hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white border rounded overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">Product</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">Category</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">Price</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">Stock</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">Featured</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img src={getImage(p.image)} alt={p.name} className="w-10 h-10 object-contain" />
                        <span className="font-medium text-gray-800">{p.name}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{p.category}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">${p.price}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {p.featured
                          ? <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">Yes</span>
                          : <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">No</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)}
                            className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDelete(p._id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <div className="bg-white border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600 font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-medium">Role</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{u.firstName} {u.lastName}</td>
                    <td className="px-4 py-3 text-gray-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}
