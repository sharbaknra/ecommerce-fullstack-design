import logo from '../assets/assets/assets/Layout/Brand/logo-colored.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, MessageSquare, Package } from 'lucide-react'
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header>
      <div className="border-b px-4 md:px-6 py-3 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="flex items-center justify-between gap-3 md:contents">
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="The Sha Store"
              className="h-14 w-auto max-w-[180px] object-contain md:h-12 md:max-w-none"
            />
          </Link>

          {/* Mobile icons */}
          <div className="flex md:hidden items-center gap-4 text-gray-600">
            <Link to="/cart"><ShoppingCart size={22} /></Link>
            <Link to="/login"><User size={22} /></Link>
          </div>
        </div>

        <div className="flex flex-1 max-w-2xl w-full min-w-0">
          <input type="text" placeholder="Search" className="border border-gray-300 rounded-l px-3 md:px-4 py-2 w-full min-w-0 text-sm focus:outline-none" />
          <select className="hidden sm:block border border-gray-300 border-l-0 px-2 py-2 text-sm bg-white shrink-0">
            <option>All category</option>
            <option>Electronics</option>
            <option>Clothing</option>
          </select>
          <button className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-r text-sm hover:bg-blue-700 shrink-0">Search</button>
        </div>

        {/* Desktop icons */}
        <div className="hidden md:flex items-center gap-5 ml-auto text-gray-600 text-xs shrink-0">
          {user ? (
            <>
              <Link to="/profile" className="flex flex-col items-center hover:text-blue-600">
                <User size={20} />
                <span>{user.firstName}</span>
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="flex flex-col items-center hover:text-blue-600">
                  <Package size={20} />
                  <span>Admin</span>
                </Link>
              )}
              <button onClick={handleLogout} className="flex flex-col items-center hover:text-red-500">
                <MessageSquare size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="flex flex-col items-center hover:text-blue-600">
              <User size={20} />
              <span>Login</span>
            </Link>
          )}
          <Link to="/cart" className="flex flex-col items-center hover:text-blue-600">
            <ShoppingCart size={20} />
            <span>My cart {cartCount > 0 && `(${cartCount})`}</span>
          </Link>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between border-b px-6 py-2 text-sm text-gray-700">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1 font-medium">☰ All category</button>
          <Link to="#" className="hover:text-blue-600">Hot offers</Link>
          <Link to="#" className="hover:text-blue-600">Gift boxes</Link>
          <Link to="#" className="hover:text-blue-600">Projects</Link>
          <Link to="#" className="hover:text-blue-600">Menu item</Link>
          <span className="hover:text-blue-600 cursor-pointer">Help ▾</span>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <span>English, USD ▾</span>
          <span>Ship to 🇩🇪 ▾</span>
        </div>
      </div>
    </header>
  )
}
