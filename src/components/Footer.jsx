import { Link } from 'react-router-dom'
import logo from '../assets/assets/assets/Layout/Brand/logo-colored.png'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="bg-gray-50 py-8 text-center border-b">
        <h3 className="font-semibold text-lg mb-1">Subscribe on our newsletter</h3>
        <p className="text-gray-500 text-sm mb-4">Get daily news on upcoming offers from many suppliers all over the world</p>
        <div className="flex justify-center">
          <input type="email" placeholder="Email" className="border border-gray-300 rounded-l px-4 py-2 text-sm w-64 focus:outline-none" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r text-sm hover:bg-blue-700">Subscribe</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-6 gap-6 text-sm">
        <div className="col-span-2 md:col-span-1">
          <img src={logo} alt="Brand" className="h-8 mb-3" />
          <p className="text-gray-500 text-xs mb-3">Best information about the company goes here but now lorem ipsum is</p>
          <div className="flex gap-2 text-gray-400">
            {['f','t','in','yt','ig'].map((s) => (
              <a key={s} href="#" className="w-7 h-7 rounded-full border flex items-center justify-center text-xs hover:text-blue-600 hover:border-blue-600">{s}</a>
            ))}
          </div>
        </div>

        {[
          { title: 'About', links: ['About Us', 'Find store', 'Categories', 'Blogs'] },
          { title: 'Partnership', links: ['About Us', 'Find store', 'Categories', 'Blogs'] },
          { title: 'Information', links: ['Help Center', 'Money Refund', 'Shipping', 'Contact us'] },
          { title: 'For users', links: ['Login', 'Register', 'Settings', 'My Orders'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold mb-3">{col.title}</h4>
            <ul className="space-y-2 text-gray-500">
              {col.links.map((l) => (
                <li key={l}><Link to="#" className="hover:text-blue-600">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-semibold mb-3">Get app</h4>
          <div className="flex flex-col gap-2">
            <img src="/src/assets/assets/assets/Layout/Misc/app store button.png" alt="App Store" className="w-32 object-contain" />
            <img src="/src/assets/assets/assets/Layout/Misc/google play button.png" alt="Google Play" className="w-32 object-contain" />
          </div>
        </div>
      </div>

      <div className="border-t px-6 py-4 flex justify-between items-center text-xs text-gray-400">
        <span>© 2023 Ecommerce.</span>
        <span>🇺🇸 English ▾</span>
      </div>
    </footer>
  )
}
