export default function BillConfirm({ cart, customer, total, loading, onSend, onBack, onReset }) {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-orange-600 to-orange-500 text-white p-4 sm:p-6 text-center">
          <p className="text-base sm:text-xl font-extrabold">FoodBill Pro</p>
          <p className="text-orange-100 text-xs sm:text-sm mt-0.5">
            {new Date().toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
        </div>

        {/* Customer */}
        <div className="px-4 sm:px-6 py-3 bg-orange-50 border-b border-orange-100">
          <p className="text-xs sm:text-sm font-semibold text-gray-600">
            Customer: <span className="text-gray-800 font-bold">{customer.name}</span>
          </p>
          <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-0.5">
            WhatsApp: <span className="text-gray-800 font-bold">+91 {customer.whatsappNumber}</span>
          </p>
        </div>

        {/* Items table */}
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left pb-2 text-gray-400 font-semibold">Item</th>
                <th className="text-center pb-2 text-gray-400 font-semibold">Qty</th>
                <th className="text-right pb-2 text-gray-400 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cart.map(item => (
                <tr key={item.id}>
                  <td className="py-2 font-medium text-gray-700 pr-2">{item.name}</td>
                  <td className="py-2 text-center text-gray-500">{item.quantity}</td>
                  <td className="py-2 text-right font-bold text-gray-800">
                    Rs.{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="px-4 sm:px-6 py-3 bg-orange-50 border-t-2 border-orange-100 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-700">Grand Total</span>
          <span className="text-xl sm:text-2xl font-extrabold text-orange-600">
            Rs.{total}
          </span>
        </div>

        {/* Actions */}
        <div className="px-4 sm:px-6 py-4 space-y-2">
          <button
            onClick={onSend}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60">
            {loading
              ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : 'Send via WhatsApp'}
          </button>
          <button
            onClick={onBack}
            className="w-full py-2.5 border-2 border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            Edit Items
          </button>
          <button
            onClick={onReset}
            className="w-full py-2 text-xs text-gray-400 hover:text-red-500 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}