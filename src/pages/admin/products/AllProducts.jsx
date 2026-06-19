import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector'
import { fetchAdminProducts, deleteProduct, clearMessages } from '../../../features/products/productSlice'
import { updateProductApi } from '../../../api/productApi'
import { toast } from 'sonner'
import Spinner from '../../../components/common/Spinner'
import ConfirmDialog from '../../../components/common/ConfirmDialog'
import ProductGrid from './components/ProductGrid'
import EditProductModal from './components/EditProductModal'

const CATS = ['BURGER', 'PIZZA', 'DESSERT', 'JUICE', 'SNACKS']
const EMOJI = { BURGER: '🍔', PIZZA: '🍕', DESSERT: '🍰', JUICE: '🥤', SNACKS: '🍟' }

export default function AllProducts() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, loading, successMessage, error } = useAppSelector((s) => s.products)

  const [filterCat, setFilterCat] = useState('ALL')
  const [search, setSearch] = useState('')
  const [delId, setDelId] = useState(null)
  const [editProduct, setEditProduct] = useState(null)
  const [editSaving, setEditSaving] = useState(false)

  useEffect(() => { dispatch(fetchAdminProducts()) }, [dispatch])

  useEffect(() => {
    if (successMessage) { toast.success(successMessage); dispatch(clearMessages()) }
    if (error) { toast.error(error); dispatch(clearMessages()) }
  }, [successMessage, error, dispatch])

  const filtered = items
    .filter(p => filterCat === 'ALL' || p.category === filterCat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const availableCount = items.filter(p => p.available).length
  const outCount = items.filter(p => !p.available).length

  async function handleDelete(id) {
    await dispatch(deleteProduct(id))
    setDelId(null)
  }

  async function handleUpdate(formData) {
    setEditSaving(true)
    try {
      await updateProductApi(editProduct.id, formData)
      toast.success('Product updated!')
      dispatch(fetchAdminProducts())
      setEditProduct(null)
    } catch {
      toast.error('Update failed. Try again.')
    }
    setEditSaving(false)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900">All Products</h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              {items.length} total ·
              <span className="text-green-600 font-semibold"> {availableCount} available</span> ·
              <span className="text-red-500 font-semibold"> {outCount} out of stock</span>
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/add-product')}
            className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-colors w-fit">
            Add New Product
          </button>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 mb-5">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products by name..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50"
              />
            </div>
            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              {['ALL', ...CATS].map(c => (
                <button key={c} onClick={() => setFilterCat(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border-2 ${filterCat === c
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}>
                  {c === 'ALL' ? 'All' : `${EMOJI[c]} ${c}`}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Grid — 2 col mobile, 3 col md, 4 col lg */}
        {!loading && filtered.length > 0 && (
          <ProductGrid
            items={filtered}
            onEdit={setEditProduct}
            onDeleteConfirm={setDelId}
          />
        )}

        {/* Loading */}
        {loading && <Spinner />}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-lg font-bold text-gray-600">No products found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different search or category</p>
            <button
              onClick={() => navigate('/admin/add-product')}
              className="mt-6 bg-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors">
              Add First Product
            </button>
          </div>
        )}

      </div>

      {/* Edit Modal */}
      <EditProductModal
        product={editProduct}
        onSave={handleUpdate}
        onClose={() => setEditProduct(null)}
        saving={editSaving}
      />

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!delId}
        title="Delete Product?"
        message="This product will be permanently deleted and cannot be undone."
        onConfirm={() => handleDelete(delId)}
        onCancel={() => setDelId(null)}
        confirmLabel="Delete"
        danger
      />
    </div>
  )
}