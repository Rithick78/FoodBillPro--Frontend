import api from './axios'

export const getPublicProducts     = ()      => api.get('/products/public/all')
export const getMenuProducts       = ()      => api.get('/products/public/menu')
export const getProductsByCategory = (cat)   => api.get(`/products/public/category/${cat}`)
export const getAdminProducts      = ()      => api.get('/admin/products')

export const addProductApi = (fd) =>
  api.post('/admin/products', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const updateProductApi = (id, fd) =>
  api.put(`/admin/products/${id}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const deleteProductApi    = (id) => api.delete(`/admin/products/${id}`)
export const toggleProductApi    = (id) => api.patch(`/admin/products/${id}/toggle`)
export const toggleSignatureApi  = (id) => api.patch(`/admin/products/${id}/signature`)
export const toggleFastMovingApi = (id) => api.patch(`/admin/products/${id}/fastmoving`)