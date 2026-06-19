export default function FilterBar({
  searchName, searchDate,
  onNameChange, onDateChange,
  onClear, bills
}) {
  const uniqueNames = [...new Set(bills.map(b => b.customerName))]
  const hasFilter = searchName || searchDate

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-5 mb-4">
      <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2.5">
        Filter Bills
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">

        {/* Name */}
        <div>
          <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            Customer Name
          </label>
          <input
            type="text"
            value={searchName}
            onChange={e => onNameChange(e.target.value)}
            placeholder="Search by name..."
            list="customer-names"
            className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-xs sm:text-sm bg-gray-50 transition-colors"
          />
          <datalist id="customer-names">
            {uniqueNames.map(n => <option key={n} value={n} />)}
          </datalist>
        </div>

        {/* Date */}
        <div>
          <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            Date of Purchase
          </label>
          <input
            type="date"
            value={searchDate}
            onChange={e => onDateChange(e.target.value)}
            max={new Date().toLocaleDateString('en-CA')}
            className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-xs sm:text-sm bg-gray-50 transition-colors"
          />
        </div>
      </div>

      {/* Active filters */}
      {hasFilter && (
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-100">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-gray-400 font-medium">Active:</span>
            {searchName && (
              <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                {searchName}
                <button
                  onClick={() => onNameChange('')}
                  className="ml-0.5 hover:text-red-600">
                  x
                </button>
              </span>
            )}
            {searchDate && (
              <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                {new Date(searchDate).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short'
                })}
                <button
                  onClick={() => onDateChange('')}
                  className="ml-0.5 hover:text-red-600">
                  x
                </button>
              </span>
            )}
          </div>
          <button
            onClick={onClear}
            className="text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors">
            Clear All
          </button>
        </div>
      )}
    </div>
  )
}