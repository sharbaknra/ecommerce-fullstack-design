import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function Auth() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirm: '', agree: false
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white border rounded-lg p-8 shadow-sm">

          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">B</div>
              <span className="text-lg font-bold text-gray-800">Brand</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              {mode === 'login' ? 'Sign in to your account' : 'Create an account'}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {mode === 'login' ? 'Welcome back! Please enter your details.' : 'Fill in the details below to get started.'}
            </p>
          </div>

          {/* Social buttons */}
          <div className="flex gap-3 mb-5">
            <button className="flex-1 flex items-center justify-center gap-2 border rounded py-2 text-sm text-gray-600 hover:bg-gray-50">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border rounded py-2 text-sm text-gray-600 hover:bg-gray-50">
              <span className="text-blue-600 font-bold text-base">f</span>
              Facebook
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
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

            {mode === 'register' && (
              <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.agree} onChange={e => set('agree', e.target.checked)}
                  className="accent-blue-600 mt-0.5" />
                I agree to the <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
              </label>
            )}

            <Link to="/"
              className="block w-full bg-blue-600 text-white text-center py-2.5 rounded text-sm font-medium hover:bg-blue-700">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </Link>
          </div>

          {/* Switch mode */}
          <p className="text-center text-sm text-gray-500 mt-5">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-blue-600 font-medium hover:underline">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}
