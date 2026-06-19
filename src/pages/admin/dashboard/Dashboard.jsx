import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector'
import { fetchDashboard, resetDashboard } from '../../../features/billing/billingSlice'
import { fetchAdminProducts } from '../../../features/products/productSlice'
import { toast } from 'sonner'
import ConfirmDialog from '../../../components/common/ConfirmDialog'
import DashboardStats from './components/DashboardStats'
import ProductsTable from './components/ProductsTable'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { dashboard } = useAppSelector((s) => s.billing)
  const { items } = useAppSelector((s) => s.products)
  const [confirm, setConfirm] = useState(false)
  const [resetting, setResetting] = useState(false)

  useEffect(() => {
    dispatch(fetchDashboard())
    dispatch(fetchAdminProducts())
  }, [dispatch])

  async function handleReset() {
    setResetting(true)
    const res = await dispatch(resetDashboard())
    if (resetDashboard.fulfilled.match(res)) {
      toast.success('Dashboard reset!')
      dispatch(fetchDashboard())
    } else {
      toast.error('Reset failed')
    }
    setResetting(false)
    setConfirm(false)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long', year: 'numeric',
              month: 'long', day: 'numeric',
            })}
          </p>
        </div>

        {/* Stats */}
        <DashboardStats dashboard={dashboard} items={items} />

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/billing"
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
              New Bill
            </Link>
            <Link to="/admin/add-product"
              className="bg-white border-2 border-orange-200 hover:bg-orange-50 text-orange-600 text-xs font-bold px-4 py-2 rounded-lg transition-colors">
              Add Product
            </Link>
            <button
              onClick={() => setConfirm(true)}
              className="bg-white border-2 border-red-200 hover:bg-red-50 text-red-500 text-xs font-bold px-4 py-2 rounded-lg transition-colors">
              Reset EOD
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Products ({items.length})
            </h2>
            <span className="text-[10px] text-gray-400">
              Tap Best or Popular to toggle badges
            </span>
          </div>
          <ProductsTable items={items} />
        </div>
      </div>

      <ConfirmDialog
        open={confirm}
        title="Reset Today's Data?"
        message="Bills count and total sales will reset to zero."
        onConfirm={handleReset}
        onCancel={() => setConfirm(false)}
        loading={resetting}
        confirmLabel="Yes, Reset"
        danger
      />
    </div>
  )
}