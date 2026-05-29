import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  image: { type: String },
  description: { type: String },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  shipping: { type: String, default: 'Free Shipping' },
  featured: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
