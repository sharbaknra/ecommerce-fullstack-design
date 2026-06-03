import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Ecommerce API running', port: PORT })
})

app.get('/api', (req, res) => {
  res.json({ message: 'Ecommerce API running' })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.error('MongoDB connection error:', err))
