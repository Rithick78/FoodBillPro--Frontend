import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector'
import { fetchAdminProducts } from '../../../features/products/productSlice'
import { setCustomer, clearCart, createBill } from '../../../features/billing/billingSlice'
import { toast } from 'sonner'
import CustomerForm from './components/CustomerForm'
import ItemPicker from './components/ItemPicker'
import OrderCart from './components/OrderCart'
import BillConfirm from './components/BillConfirm'
import { Check } from 'lucide-react'

const STEPS = [
  { n: 1, label: 'Customer' },
  { n: 2, label: 'Items' },
  { n: 3, label: 'Confirm' },
]

export default function BillingPage() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((s) => s.products)
  const { cart, customer, loading } = useAppSelector((s) => s.billing)
  const [step, setStep] = useState(1)
  const [localCustomer, setLocalCustomer] = useState({ name: '', whatsappNumber: '' })

  useEffect(() => { dispatch(fetchAdminProducts()) }, [dispatch])

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const totalQty = cart.reduce((s, i) => s + i.quantity, 0)

  function handleCustomerSubmit(e) {
    e.preventDefault()
    if (!localCustomer.name.trim()) { toast.error('Enter customer name'); return }
    if (localCustomer.whatsappNumber.length < 10) { toast.error('Enter valid 10-digit number'); return }
    dispatch(setCustomer(localCustomer))
    setStep(2)
  }

  async function handleSendBill() {
    if (cart.length === 0) { toast.error('Add at least one item'); return }

    const res = await dispatch(createBill({
      customerName: customer.name,
      whatsappNumber: customer.whatsappNumber,
      items: cart.map(i => ({ productId: i.id, quantity: i.quantity })),
    }))

    if (createBill.fulfilled.match(res)) {
      const lines = cart.map(i => `${i.quantity}x ${i.name}  Rs.${i.price * i.quantity}`)
      const msg = [
        '*FoodBill Pro*',
        '________________',
        `Customer: *${customer.name}*`,
        '________________',
        ...lines,
        '________________',
        `*Total: Rs.${total}*`,
        '________________',
        'Thank you for ordering! Visit again.',
      ].join('\n')

      window.open(
        `https://wa.me/91${customer.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`,
        '_blank'
      )
      toast.success('Bill sent via WhatsApp!')
      dispatch(clearCart())
      setLocalCustomer({ name: '', whatsappNumber: '' })
      setStep(1)
    } else {
      toast.error('Failed to create bill')
    }
  }

  function handleReset() {
    dispatch(clearCart())
    setLocalCustomer({ name: '', whatsappNumber: '' })
    setStep(1)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">

        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900">New Bill</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Create a bill and send to customer WhatsApp
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                step === s.n
                  ? 'bg-orange-600 text-white shadow-md'
                  : step > s.n
                  ? 'bg-green-500 text-white'
                  : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                {step > s.n
                  ? <Check className="w-3 h-3" />
                  : <span>{s.n}</span>}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-6 sm:w-12 rounded ${
                  step > s.n ? 'bg-green-400' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <CustomerForm
            customer={localCustomer}
            onChange={setLocalCustomer}
            onSubmit={handleCustomerSubmit}
          />
        )}

        {/* side by side on desktop, stacked on mobile */}
        {step === 2 && (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">

            {/* Item Picker */}
            <div className="lg:col-span-2">
              <ItemPicker items={items} cart={cart} />
            </div>

            <div className="lg:col-span-1">

              <div className="lg:hidden">
                <MobileCartBar
                  cart={cart}
                  total={total}
                  totalQty={totalQty}
                  customer={customer}
                  onNext={() => setStep(3)}
                  onReset={handleReset}
                />
              </div>

              {/* sidebar */}
              <div className="hidden lg:block">
                <OrderCart
                  cart={cart}
                  customer={customer}
                  total={total}
                  totalQty={totalQty}
                  onNext={() => setStep(3)}
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <BillConfirm
            cart={cart}
            customer={customer}
            total={total}
            loading={loading}
            onSend={handleSendBill}
            onBack={() => setStep(2)}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  )
}

function MobileCartBar({ cart, total, totalQty, customer, onNext, onReset }) {
  const [expanded, setExpanded] = useState(false)

  if (cart.length === 0) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40">
        <p className="text-xs text-gray-400 text-center">
          No items added yet — add from the list above
        </p>
      </div>
    )
  }

  return (
    <>
      {expanded && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setExpanded(false)} />
      )}

      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-all duration-300 ${
        expanded ? 'rounded-t-2xl shadow-2xl' : ''}`}>

        {expanded && (
          <div className="px-4 pt-4 max-h-64 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-800">
                Order Summary — {customer.name}
              </p>
              <button
                onClick={() => setExpanded(false)}
                className="text-gray-400 text-xs font-bold">
                Close
              </button>
            </div>
            <div className="space-y-2 mb-3">
              {cart.map(item => (
                <div key={item.id}
                  className="flex justify-between items-center py-1.5 border-b border-gray-50">
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{item.name}</p>
                    <p className="text-[10px] text-gray-400">
                      Rs.{item.price} x {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-orange-600">
                    Rs.{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className="px-4 py-3 flex items-center gap-3">
          {/* Cart info */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-extrabold">{totalQty}</span>
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs text-gray-500 leading-none">
                {cart.length} item{cart.length !== 1 ? 's' : ''} • tap to view
              </p>
              <p className="text-sm font-extrabold text-gray-800 leading-tight">
                Rs.{total}
              </p>
            </div>
          </button>

          {/* Review bill button */}
          <button
            onClick={onNext}
            className="shrink-0 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
            Review Bill
          </button>
        </div>
      </div>

      {/* Spacer so content isn't hidden behind sticky bar */}
      <div className="h-20" />
    </>
  )
}