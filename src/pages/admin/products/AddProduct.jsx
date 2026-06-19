import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector'
import { addProduct, clearMessages } from '../../../features/products/productSlice'
import { toast } from 'sonner'
import ProductForm from './components/ProductForm'

export default function AddProduct() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { successMessage, error } = useAppSelector((s) => s.products)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (successMessage) { toast.success(successMessage); dispatch(clearMessages()) }
    if (error) { toast.error(error); dispatch(clearMessages()) }
  }, [successMessage, error, dispatch])

  async function handleSubmit(formData) {
    if (!formData.get('name').trim()) { toast.error('Product name is required'); return false }
    if (!formData.get('price') || Number(formData.get('price')) <= 0) {
      toast.error('Enter a valid price'); return false
    }
    setSaving(true)
    const res = await dispatch(addProduct(formData))
    setSaving(false)
    if (addProduct.fulfilled.match(res)) {
      toast.success('Product added!')
      return true
    }
    return false
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-2xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-8">

        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-base sm:text-2xl font-extrabold text-gray-900">
              Add New Product
            </h1>
            <p className="text-gray-400 text-[11px] sm:text-sm mt-0.5">
              Fill in the details to add a new menu item
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/products')}
            className="shrink-0 text-[11px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors border border-orange-200 whitespace-nowrap">
            View All
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-8">
          <ProductForm onSubmit={handleSubmit} saving={saving} />
        </div>
      </div>
    </div>
  )
}