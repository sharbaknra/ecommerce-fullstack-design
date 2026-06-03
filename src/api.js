const BASE_URL = 'https://ecommerce-fullstack-design-production-0d0d.up.railway.app/api'

export const getProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE_URL}/products?${query}`)
  return res.json()
}

export const getProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  return res.json()
}

export const createProduct = async (data) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const updateProduct = async (id, data) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}
