export default function BillCard({ bill, expanded, onToggle, onDelete }) {
  function formatDate(dateStr) {
    const d = new Date(dateStr)
    return (
      d.toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
      }) +
      ' · ' +
      d.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit',
      })
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Bill Header */}
      <div className="p-3 sm:p-5">
        <div className="flex items-start justify-between gap-2">

          {/* customer info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-800 text-sm leading-tight truncate">
                {bill.customerName}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                +91 {bill.whatsappNumber}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {formatDate(bill.createdAt)}
              </p>
            </div>
          </div>

          {/* amount + meta */}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-base sm:text-xl font-extrabold text-orange-600">
              Rs.{bill.totalAmount.toLocaleString('en-IN')}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full font-semibold">
                Bill #{bill.id}
              </span>
              <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full font-semibold">
                {bill.items?.length || 0} items
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={onToggle}
            className="flex items-center gap-1 text-[10px] sm:text-xs font-bold px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
            {expanded ? 'Hide Items' : 'View Items'}
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 text-[10px] sm:text-xs font-bold px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
            Delete
          </button>
        </div>
      </div>

      {/* Expanded Items */}
      {expanded && bill.items && bill.items.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50 px-3 sm:px-5 py-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">
            Order Details
          </p>
          <div className="space-y-1.5">
            {bill.items.map((item, idx) => (
              <div key={idx}
                className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center text-[10px] font-extrabold shrink-0">
                    {item.quantity}x
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {item.product?.name || 'Product'}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Rs.{item.unitPrice} each
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-800">
                  Rs.{item.subtotal}
                </span>
              </div>
            ))}
          </div>

          {/* Total row */}
          <div className="flex justify-between items-center mt-3 pt-2.5 border-t-2 border-orange-100">
            <span className="text-xs font-bold text-gray-700">Grand Total</span>
            <span className="text-base font-extrabold text-orange-600">
              Rs.{bill.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}