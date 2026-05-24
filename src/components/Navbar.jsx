import { Link } from 'react-router-dom'
import { ShoppingCart, User, MessageSquare, Package } from 'lucide-react'
import logo from '../assets/assets/assets/Layout/Brand/logo-colored.png'

export default function Navbar() {
  return (
    <header>
      {/* Top bar */}
      <div className="border-b px-6 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <img src={logo} alt="Brand" className="h-8" />
        </Link>

        {/* Search */}
        <div className="flex flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-l px-4 py-2 w-full text-sm focus:outline-none"
          />
          <select className="border border-gray-300 border-l-0 px-2 py-2 text-sm bg-white">
            <option>All category</option>
            <option>Electronics</option>
            <option>Clothing</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r text-sm hover:bg-blue-700">
            Search
          </button>
        </div>

        {/* Icons desktop */}
        <div className="hidden md:flex items-center gap-5 ml-auto text-gray-600 text-xs">
          <Link to="#" className="flex flex-col items-center hover:text-blue-600">
            <User size={20} /><span>Profile</span>
          </Link>
          <Link to="#" className="flex flex-col items-center hover:text-blue-600">
            <MessageSquare size={20} /><span>Message</span>
          </Link>
          <Link to="#" className="flex flex-col items-center hover:text-blue-600">
            <Package size={20} /><span>Orders</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center hover:text-blue-600">
            <ShoppingCart size={20} /><span>My cart</span>
          </Link>
        </div>

        {/* Icons mobile */}
        <div className="flex md:hidden items-center gap-4 ml-auto text-gray-600">
          <Link to="/cart"><ShoppingCart size={22} /></Link>
          <Link to="#"><User size={22} /></Link>
        </div>
      </div>

      {/* Bottom nav desktop */}
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
