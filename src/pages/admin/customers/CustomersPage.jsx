import { useEffect, useState } from 'react'
import { getAllBillsApi, deleteBillApi } from '../../../api/billingApi'
import { toast } from 'sonner'
import ConfirmDialog from '../../../components/common/ConfirmDialog'
import FilterBar from './components/FilterBar'
import BillCard from './components/BillCard'

export default function CustomersPage() {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchName, setSearchName] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [delId, setDelId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { loadBills() }, [])

  async function loadBills() {
    setLoading(true)
    try {
      const res = await getAllBillsApi()
      setBills(res.data)
    } catch {
      toast.error('Failed to load bills')
    }
    setLoading(false)
  }

  async function handleDelete(id) {
    setDeleting(true)
    try {
      await deleteBillApi(id)
      setBills(prev => prev.filter(b => b.id !== id))
      toast.success('Bill deleted')
    } catch {
      toast.error('Failed to delete')
    }
    setDeleting(false)
    setDelId(null)
  }

  const filtered = bills.filter(b => {
    const nameMatch = b.customerName
      .toLowerCase()
      .includes(searchName.toLowerCase())
    const dateMatch = searchDate
      ? new Date(b.createdAt).toLocaleDateString('en-CA') === searchDate
      : true
    return nameMatch && dateMatch
  })

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900">
            Customer Bills
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            {bills.length} total bills
          </p>
        </div>

        {/* Filter */}
        <FilterBar
          searchName={searchName}
          searchDate={searchDate}
          onNameChange={setSearchName}
          onDateChange={setSearchDate}
          onClear={() => { setSearchName(''); setSearchDate('') }}
          bills={bills}
        />

        {/* Results count */}
        {(searchName || searchDate) && !loading && (
          <p className="text-xs text-gray-500 mb-3 font-medium">
            Showing{' '}
            <span className="font-bold text-gray-800">{filtered.length}</span>
            {' '}of {bills.length} bills
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <svg className="w-12 h-12 text-gray-200 mb-3" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm font-bold text-gray-600">No bills found</p>
            <p className="text-xs text-gray-400 mt-1">
              {searchName || searchDate
                ? 'Try changing the filters'
                : 'No bills created yet'}
            </p>
          </div>
        )}

        {/* Bills */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map(bill => (
              <BillCard
                key={bill.id}
                bill={bill}
                expanded={expandedId === bill.id}
                onToggle={() =>
                  setExpandedId(expandedId === bill.id ? null : bill.id)
                }
                onDelete={() => setDelId(bill.id)}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!delId}
        title="Delete this bill?"
        message="This bill will be permanently removed."
        onConfirm={() => handleDelete(delId)}
        onCancel={() => setDelId(null)}
        loading={deleting}
        confirmLabel="Delete"
        danger
      />
    </div>
  )
}