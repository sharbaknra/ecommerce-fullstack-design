import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const BASE_URL = 'http://localhost:5000/api'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirm: '', agree: false
  })

  const { login } = useAuth()
  const navigate = useNavigate()
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setError('')
    if (mode === 'register' && form.password !== form.confirm) {
      return setError('Passwords do not match')
    }
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register'
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : { firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password }

      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error || 'Something went wrong')

      login(data.token, data.user)
      navigate(data.user.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      setError('Server error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">B</div>
              <span className="text-lg font-bold text-gray-800">Brand</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">
              {mode === 'login' ? 'Sign in to your account' : 'Create an account'}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {mode === 'login' ? 'Welcome back!' : 'Fill in the details below to get started.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">First name</label>
                  <input value={form.firstName} onChange={e => set('firstName', e.target.value)}
                    placeholder="John"
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Last name</label>
                  <input value={form.lastName} onChange={e => set('lastName', e.target.value)}
                    placeholder="Doe"
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email address</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                placeholder="john@example.com"
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 pr-10" />
                <button onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Confirm password</label>
                <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)}
                  placeholder="••••••••"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="accent-blue-600" />
                  Remember me
                </label>
                <button className="text-sm text-blue-600 hover:underline">Forgot password?</button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
              className="text-blue-600 font-medium hover:underline">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
