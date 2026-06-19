export default function CustomerForm({ customer, onChange, onSubmit }) {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Customer Details</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customer.name}
              onChange={e => onChange({ ...customer, name: e.target.value })}
              placeholder="e.g. Ravi Kumar"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="px-4 py-3 bg-gray-100 border-2 border-r-0 border-gray-100 rounded-l-xl text-sm font-bold text-gray-600">
                +91
              </span>
              <input
                type="tel"
                value={customer.whatsappNumber}
                onChange={e => onChange({ ...customer, whatsappNumber: e.target.value })}
                placeholder="9876543210"
                maxLength={10}
                className="flex-1 px-4 py-3 rounded-r-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50"
              />
            </div>
          </div>
          <button type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-colors mt-2">
            Next: Pick Items
          </button>
        </form>
      </div>
    </div>
  )
}