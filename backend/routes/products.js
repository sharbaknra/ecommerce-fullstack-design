import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// GET all products (with optional search and category filter)
router.get('/', async (req, res) => {
  try {
    const { search, category, featured } = req.query
    let query = {}

    if (search) query.name = { $regex: search, $options: 'i' }
    if (category) query.category = { $regex: category, $options: 'i' }
    if (featured) query.featured = true

    const products = await Product.find(query)
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
