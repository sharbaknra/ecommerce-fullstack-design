import { Link } from 'react-router-dom'

// Banner
import banner from '../assets/assets/assets/Image/backgrounds/Banner-board-800x420 2.png'

// Tech
import camera from '../assets/assets/assets/Image/tech/camera.png'
import earphone from '../assets/assets/assets/Image/tech/earphone.png'
import electricKettle from '../assets/assets/assets/Image/tech/electric kettle.png'
import gamingEarphone from '../assets/assets/assets/Image/tech/gaming earphone.png'
import iphone from '../assets/assets/assets/Image/tech/iphone.png'
import laptop from '../assets/assets/assets/Image/tech/laptop.png'
import smartphone from '../assets/assets/assets/Image/tech/smart phone.png'
import smartwatch from '../assets/assets/assets/Image/tech/smart watches.png'
import tablet from '../assets/assets/assets/Image/tech/tablet.png'

// Interior
import claypot from '../assets/assets/assets/Image/interior/claypot.png'
import coffeeMachine from '../assets/assets/assets/Image/interior/coffee machine.png'
import lamp from '../assets/assets/assets/Image/interior/lamp.png'
import juicerMachine from '../assets/assets/assets/Image/interior/juicer machine.png'
import mattress from '../assets/assets/assets/Image/interior/mattress.png'
import rack from '../assets/assets/assets/Image/interior/rack.png'
import plantPot from '../assets/assets/assets/Image/interior/plant pot.png'
import sofa from '../assets/assets/assets/Image/interior/sofa.png'

// Cloth
import bag from '../assets/assets/assets/Layout/alibaba/Image/cloth/bag.png'
import jacket from '../assets/assets/assets/Layout/alibaba/Image/cloth/jacket.png'
import shortJeans from '../assets/assets/assets/Layout/alibaba/Image/cloth/short jeans.png'
import shirt from '../assets/assets/assets/Layout/alibaba/Image/cloth/shirt.png'
import wallet from '../assets/assets/assets/Layout/alibaba/Image/cloth/wallet.png'
import blazerCoat from '../assets/assets/assets/Layout/alibaba/Image/cloth/blazer coat.png'

// Flags
import flagUAE from '../assets/assets/assets/Layout1/Image/flags/UAE.png'
import flagUSA from '../assets/assets/assets/Layout1/Image/flags/usa.png'
import flagRussia from '../assets/assets/assets/Layout1/Image/flags/russia.png'
import flagItaly from '../assets/assets/assets/Layout1/Image/flags/italy.png'
import flagFrance from '../assets/assets/assets/Layout1/Image/flags/france.png'
import flagChina from '../assets/assets/assets/Layout1/Image/flags/china.png'
import flagEngland from '../assets/assets/assets/Layout1/Image/flags/england.png'
import flagGermany from '../assets/assets/assets/Layout1/Image/flags/germany.png'
import flagDenmark from '../assets/assets/assets/Layout1/Image/flags/denmark.png'

// App buttons
import appStore from '../assets/assets/assets/Layout/Misc/app store button.png'
import googlePlay from '../assets/assets/assets/Layout/Misc/google play button.png'

const categories = ['Automobiles','Clothes and wear','Home interiors','Computer and tech','Tools, equipments','Sports and outdoor','Animal and pets','Machinery tools','More category']

const deals = [
  { img: smartwatch, label: 'Smart watches', discount: '-25%' },
  { img: laptop, label: 'Laptops', discount: '-15%' },
  { img: camera, label: 'Cameras', discount: '-40%' },
  { img: earphone, label: 'Headphones', discount: '-25%' },
  { img: iphone, label: 'Smartphones', discount: '-25%' },
]

const homeItems = [
  { img: rack, label: 'Soft chairs', price: 'From USD 19' },
  { img: sofa, label: 'Sofa & chair', price: 'From USD 19' },
  { img: claypot, label: 'Kitchen dishes', price: 'From USD 19' },
  { img: smartwatch, label: 'Smart watches', price: 'From USD 18' },
  { img: juicerMachine, label: 'Kitchen mixer', price: 'From USD 100' },
  { img: coffeeMachine, label: 'Juicer', price: 'From USD 39' },
  { img: lamp, label: 'Home appliance', price: 'From USD 19' },
  { img: electricKettle, label: 'Coffee maker', price: 'From USD 10' },
]

const techItems = [
  { img: smartwatch, label: 'Smart watches', price: 'From USD 19' },
  { img: camera, label: 'Cameras', price: 'From USD 89' },
  { img: earphone, label: 'Headphones', price: 'From USD 70' },
  { img: smartwatch, label: 'Smart watches', price: 'From USD 90' },
  { img: gamingEarphone, label: 'Gaming set', price: 'From USD 35' },
  { img: laptop, label: 'Laptops & PC', price: 'From USD 340' },
  { img: smartphone, label: 'Smartphones', price: 'From USD 19' },
  { img: electricKettle, label: 'Electric kettle', price: 'From USD 240' },
]

const recommended = [
  { img: shirt, name: 'T-shirts with multiple colors, for men', price: '$10.30' },
  { img: shortJeans, name: 'Jeans shorts for men blue color', price: '$10.30' },
  { img: blazerCoat, name: 'Blazer coat medium size', price: '$12.50' },
  { img: bag, name: 'Jeans bag for travel for men', price: '$34.00' },
  { img: wallet, name: 'Leather wallet', price: '$99.00' },
  { img: camera, name: 'Canon camera black, 100x zoom', price: '$9.99' },
  { img: gamingEarphone, name: 'Headset for gaming with mic', price: '$8.99' },
  { img: smartwatch, name: 'Smartwatch silver color modern', price: '$10.30' },
  { img: wallet, name: 'Blue wallet for men leather', price: '$10.30' },
  { img: bag, name: 'Jeans bag for travel for men', price: '$80.95' },
]

const regions = [
  { flag: flagUAE, country: 'Arabic Emirates', domain: 'shopname.ae' },
  { flag: flagDenmark, country: 'Australia', domain: 'shopname.com.au' },
  { flag: flagUSA, country: 'United States', domain: 'shopname.com' },
  { flag: flagRussia, country: 'Russia', domain: 'shopname.ru' },
  { flag: flagItaly, country: 'Italy', domain: 'shopname.co.it' },
  { flag: flagFrance, country: 'France', domain: 'shopname.com.fr' },
  { flag: flagUAE, country: 'Arabic Emirates', domain: 'shopname.ae' },
  { flag: flagChina, country: 'China', domain: 'shopname.cn' },
  { flag: flagEngland, country: 'Great Britain', domain: 'shopname.co.uk' },
]

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3">
        <div className="hidden md:block bg-white rounded border w-48 shrink-0">
          <ul className="text-sm py-2">
            {categories.map((cat) => (
              <li key={cat}>
                <Link to="/products" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 rounded overflow-hidden relative min-h-48">
          <img src={banner} alt="Banner" className="w-full h-full object-cover rounded" />
          <div className="absolute inset-0 flex flex-col justify-center px-8">
            <p className="text-gray-600 text-sm">Latest trending</p>
            <h2 className="text-2xl font-bold text-gray-800">Electronic items</h2>
            <Link to="/products" className="mt-3 inline-block bg-white text-gray-800 text-sm px-4 py-2 rounded hover:bg-gray-100 w-fit">Learn more</Link>
          </div>
        </div>
        <div className="hidden lg:flex flex-col gap-2 w-44 shrink-0">
          <div className="bg-blue-600 text-white rounded p-3 text-sm">
            <p className="text-xs opacity-80">Hi, user</p>
            <p className="font-semibold">let's get started</p>
            <Link to="#" className="block mt-2 bg-white text-blue-600 text-center text-xs py-1 rounded font-medium">Join now</Link>
            <Link to="#" className="block mt-1 border border-white text-white text-center text-xs py-1 rounded">Log in</Link>
          </div>
          <div className="bg-orange-400 text-white rounded p-3 text-xs">Get US $10 off with a new supplier</div>
          <div className="bg-teal-500 text-white rounded p-3 text-xs">Send quotes with supplier preferences</div>
        </div>
      </div>

      {/* Deals */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded border p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">Deals and offers</h3>
              <p className="text-gray-400 text-xs">Hygiene equipments</p>
            </div>
            <div className="flex gap-2 text-center text-xs">
              {[['04','Days'],['13','Hour'],['34','Min'],['56','Sec']].map(([n,l]) => (
                <div key={l} className="bg-gray-800 text-white rounded px-2 py-1 min-w-[36px]">
                  <div className="font-bold text-sm">{n}</div>
                  <div className="text-gray-400">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {deals.map((d) => (
              <Link to="/products" key={d.label} className="border rounded p-3 text-center hover:shadow-sm">
                <img src={d.img} alt={d.label} className="h-20 mx-auto object-contain mb-2" />
                <p className="text-xs text-gray-700">{d.label}</p>
                <span className="inline-block mt-1 bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded">{d.discount}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Home and Outdoor */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="bg-white rounded border p-4 flex gap-4">
          <div className="hidden md:flex flex-col justify-between bg-amber-50 rounded p-4 w-44 shrink-0">
            <div>
              <h4 className="font-semibold text-gray-800">Home and outdoor</h4>
              <Link to="/products" className="mt-3 inline-block border border-gray-400 text-xs px-3 py-1 rounded hover:bg-gray-100">Source now</Link>
            </div>
            <img src={sofa} alt="sofa" className="h-20 object-contain mt-2" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 flex-1">
            {homeItems.map((item) => (
              <Link to="/products" key={item.label} className="text-center hover:opacity-80">
                <img src={item.img} alt={item.label} className="h-16 mx-auto object-contain mb-1" />
                <p className="text-xs font-medium text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-400">{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Consumer Electronics */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="bg-white rounded border p-4 flex gap-4">
          <div className="hidden md:flex flex-col justify-between bg-blue-50 rounded p-4 w-44 shrink-0">
            <div>
              <h4 className="font-semibold text-gray-800">Consumer electronics and gadgets</h4>
              <Link to="/products" className="mt-3 inline-block border border-gray-400 text-xs px-3 py-1 rounded hover:bg-gray-100">Source now</Link>
            </div>
            <img src={smartphone} alt="phone" className="h-20 object-contain mt-2" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 flex-1">
            {techItems.map((item, i) => (
              <Link to="/products" key={i} className="text-center hover:opacity-80">
                <img src={item.img} alt={item.label} className="h-16 mx-auto object-contain mb-1" />
                <p className="text-xs font-medium text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-400">{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="rounded overflow-hidden bg-blue-600 flex flex-col md:flex-row items-center justify-between px-8 py-8 gap-6">
          <div className="text-white max-w-sm">
            <h3 className="text-xl font-bold mb-2">An easy way to send requests to all suppliers</h3>
            <p className="text-blue-200 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
          <div className="bg-white rounded p-5 w-full max-w-sm">
            <h4 className="font-semibold mb-3 text-sm">Send quote to suppliers</h4>
            <p className="text-xs text-gray-500 mb-1">What item you need?</p>
            <textarea className="w-full border rounded text-sm p-2 mb-3 h-16 focus:outline-none resize-none" placeholder="Type more details" />
            <div className="flex gap-2 mb-3">
              <input className="border rounded px-2 py-1 text-sm flex-1 focus:outline-none" placeholder="Quantity" />
              <select className="border rounded px-2 py-1 text-sm"><option>Pcs</option></select>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">Send inquiry</button>
          </div>
        </div>
      </div>

      {/* Recommended Items */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h3 className="font-semibold text-gray-800 mb-3">Recommended items</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {recommended.map((item, i) => (
            <Link to={`/products/${i+1}`} key={i} className="bg-white border rounded p-3 hover:shadow-sm">
              <img src={item.img} alt={item.name} className="h-32 w-full object-contain mb-2" />
              <p className="text-sm font-semibold text-gray-800">{item.price}</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Extra Services */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h3 className="font-semibold text-gray-800 mb-3">Our extra services</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { bg: 'bg-yellow-100', label: 'Source from Industry Hubs' },
            { bg: 'bg-blue-100', label: 'Customize Your Products' },
            { bg: 'bg-green-100', label: 'Fast, reliable shipping by ocean or air' },
            { bg: 'bg-purple-100', label: 'Product monitoring and inspection' },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded h-28 flex items-end p-3 cursor-pointer hover:opacity-90`}>
              <span className="text-sm font-medium text-gray-800">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suppliers by Region */}
      <div className="max-w-7xl mx-auto px-4 py-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Suppliers by region</h3>
        <div className="bg-white border rounded p-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {regions.map((r, i) => (
            <div key={i} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <img src={r.flag} alt={r.country} className="w-6 h-4 object-cover rounded-sm" />
              <div>
                <p className="text-xs font-medium text-gray-700">{r.country}</p>
                <p className="text-xs text-gray-400">{r.domain}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
