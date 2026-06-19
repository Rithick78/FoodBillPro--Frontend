import { useAppDispatch } from '../../../../hooks/useAppSelector'
import { clearCart } from '../../../../features/billing/billingSlice'

export default function OrderCart({ cart, customer, total, totalQty, onNext, onReset }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-24">
      <h3 className="font-bold text-gray-800 mb-1">Order Summary</h3>
      <p className="text-xs text-gray-400 mb-4">
        For: <strong>{customer.name}</strong>
      </p>

      {cart.length === 0
        ? <div className="text-center py-12 text-gray-300">
            <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-sm">No items added yet</p>
          </div>
        : <>
            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">Rs.{item.price} x {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-orange-600 shrink-0">
                    Rs.{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-orange-100 pt-3 mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Items</span><span>{totalQty}</span>
              </div>
              <div className="flex justify-between font-extrabold text-xl">
                <span>Total</span>
                <span className="text-orange-600">Rs.{total}</span>
              </div>
            </div>
            <button onClick={onNext}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-colors">
              Review Bill
            </button>
          </>}

      <button onClick={onReset}
        className="w-full mt-2 py-2 text-sm text-gray-400 hover:text-red-500 transition-colors">
        Start Over
      </button>
    </div>
  )
}