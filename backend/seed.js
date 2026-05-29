import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

const products = [
  { name: 'Smart Watch Series 6', price: 99.50, oldPrice: 112.00, image: 'smartwatch', description: 'Latest smart watch with health tracking features.', category: 'Electronics', stock: 50, rating: 7.5, orders: 154, shipping: 'Free Shipping', featured: true },
  { name: 'Laptop Pro 15 inch', price: 349.00, oldPrice: 400.00, image: 'laptop', description: 'High performance laptop for professionals.', category: 'Electronics', stock: 20, rating: 8.0, orders: 89, shipping: 'Free Shipping', featured: true },
  { name: 'Canon Camera EOS 2000', price: 299.00, oldPrice: 350.00, image: 'camera', description: 'Professional DSLR camera with 10x zoom.', category: 'Electronics', stock: 15, rating: 9.0, orders: 200, shipping: 'Free Shipping', featured: true },
  { name: 'Wireless Earphones', price: 49.99, oldPrice: 79.99, image: 'earphone', description: 'Premium wireless earphones with noise cancellation.', category: 'Electronics', stock: 100, rating: 7.0, orders: 320, shipping: 'Free Shipping', featured: false },
  { name: 'Gaming Headset', price: 89.99, oldPrice: 110.00, image: 'gamingEarphone', description: 'Pro gaming headset with surround sound.', category: 'Electronics', stock: 40, rating: 8.5, orders: 175, shipping: 'Free Shipping', featured: false },
  { name: 'Samsung Smartphone', price: 199.00, oldPrice: 250.00, image: 'smartphone', description: 'Latest Samsung flagship smartphone.', category: 'Electronics', stock: 30, rating: 8.0, orders: 410, shipping: 'Free Shipping', featured: true },
  { name: 'Apple iPhone 14', price: 599.00, oldPrice: 699.00, image: 'iphone', description: 'Apple iPhone 14 with A15 Bionic chip.', category: 'Electronics', stock: 25, rating: 9.5, orders: 520, shipping: 'Free Shipping', featured: true },
  { name: 'Android Tablet', price: 149.00, oldPrice: 180.00, image: 'tablet', description: 'High resolution Android tablet for work and play.', category: 'Electronics', stock: 35, rating: 7.0, orders: 95, shipping: 'Free Shipping', featured: false },
  { name: 'Electric Kettle', price: 29.99, oldPrice: 45.00, image: 'electricKettle', description: 'Fast boiling electric kettle 1.5L capacity.', category: 'Home', stock: 80, rating: 7.5, orders: 230, shipping: 'Free Shipping', featured: false },
  { name: 'T-shirt for Men', price: 10.30, oldPrice: null, image: 'shirt', description: 'T-shirts with multiple colors for men.', category: 'Clothing', stock: 200, rating: 6.5, orders: 890, shipping: 'Free Shipping', featured: true },
  { name: 'Short Jeans for Men', price: 10.30, oldPrice: null, image: 'shortJeans', description: 'Jeans shorts for men blue color.', category: 'Clothing', stock: 150, rating: 6.0, orders: 670, shipping: 'Free Shipping', featured: false },
  { name: 'Blazer Coat', price: 12.50, oldPrice: null, image: 'blazerCoat', description: 'Brown winter coat medium size.', category: 'Clothing', stock: 75, rating: 7.0, orders: 340, shipping: 'Free Shipping', featured: true },
  { name: 'Travel Bag', price: 34.00, oldPrice: 50.00, image: 'bag', description: 'Jeans bag for travel for men.', category: 'Clothing', stock: 60, rating: 7.5, orders: 210, shipping: 'Free Shipping', featured: false },
  { name: 'Leather Wallet', price: 99.00, oldPrice: 120.00, image: 'wallet', description: 'Premium leather wallet for men.', category: 'Clothing', stock: 90, rating: 8.0, orders: 445, shipping: 'Free Shipping', featured: false },
  { name: 'Sofa Chair', price: 199.00, oldPrice: 250.00, image: 'sofa', description: 'Modern sofa chair for living room.', category: 'Home', stock: 10, rating: 8.5, orders: 55, shipping: 'Free Shipping', featured: true },
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected')
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log(`Seeded ${products.length} products successfully`)
    process.exit()
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
