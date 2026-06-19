import { useAppDispatch } from '../../../../hooks/useAppSelector'
import {
  toggleProduct,
  toggleSignature,
  toggleFastMoving,
  deleteProduct,
} from '../../../../features/products/productSlice'
import { toast } from 'sonner'
import { Pencil, Trash2 } from 'lucide-react'

const EMOJI = { BURGER: '🍔', PIZZA: '🍕', DESSERT: '🍰', JUICE: '🥤', SNACKS: '🍟' }

export default function ProductGrid({ items, onEdit, onDeleteConfirm }) {
  const dispatch = useAppDispatch()

  async function handleToggle(p) {
    const res = await dispatch(toggleProduct(p.id))
    if (toggleProduct.fulfilled.match(res)) {
      const updated = res.payload
      updated.available
        ? toast.success(`"${updated.name}" is now Available`)
        : toast.error(`"${updated.name}" marked as Out of Stock`)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">—</p>
        <p className="text-gray-400 text-sm">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {items.map(p => (
        <div
          key={p.id}
          className={`border-2 rounded-2xl overflow-hidden transition-all hover:shadow-md ${p.available ? 'border-gray-100' : 'border-red-100'}`}>

          {/* Image */}
          <div className="relative h-44 bg-gray-50 overflow-hidden">
            {p.imageData
              ? <img
                src={p.imageData}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              : <div className="w-full h-full flex items-center justify-center text-5xl">
                {EMOJI[p.category]}
              </div>
            }

            {/* Veg dot */}
            <div className={`absolute top-2 left-2 w-5 h-5 rounded border-2 border-white flex items-center justify-center shadow ${p.vegType === 'VEG' ? 'bg-green-500' : 'bg-red-500'}`}>
              <span className="w-2 h-2 bg-white rounded-full" />
            </div>

            {/* Stock badge */}
            <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm ${p.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {p.available ? 'Available' : 'Out of Stock'}
            </span>

            {/* Category */}
            <span className="absolute bottom-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {p.category}
            </span>

            {/* Badges */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              {Boolean(p.isSignature) && (
                <span className="bg-yellow-400 text-yellow-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  BEST
                </span>
              )}
              {Boolean(p.isFastMoving) && (
                <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  HOT
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-2.5 sm:p-4">
            <div className="flex items-start justify-between gap-1 mb-1">
              <h3 className="font-bold text-gray-800 text-xs sm:text-sm leading-tight line-clamp-2">
                {p.name}
              </h3>
              <span className="font-extrabold text-orange-600 text-xs sm:text-sm shrink-0">
                Rs.{p.price}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mb-2 line-clamp-2 leading-snug hidden sm:block">
              {p.description}
            </p>

            {/* Badge toggles */}
            <div className="flex gap-1.5 mb-2">
              <button
                onClick={() => dispatch(toggleSignature(p.id))}
                className={`flex-1 py-1 rounded-lg text-[8px] sm:text-xs font-bold border-2 transition-all ${Boolean(p.isSignature)
                  ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
                  : 'bg-white border-gray-200 text-gray-400'}`}>
                {Boolean(p.isSignature) ? 'Best ON' : 'Best?'}
              </button>
              <button
                onClick={() => dispatch(toggleFastMoving(p.id))}
                className={`flex-1 py-1 rounded-lg text-[8px] sm:text-xs font-bold border-2 transition-all ${Boolean(p.isFastMoving)
                  ? 'bg-red-50 border-red-300 text-red-700'
                  : 'bg-white border-gray-200 text-gray-400'}`}>
                {Boolean(p.isFastMoving) ? 'Hot ON' : 'Hot?'}
              </button>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
              <button
                onClick={() => handleToggle(p)}
                className={`py-1 rounded-lg text-[7px] sm:text-xs font-bold border-2 transition-colors ${p.available
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-green-50 border-green-200 text-green-700'}`}>
                {p.available ? 'Stock Out' : 'In Stock'}
              </button>
              <button
                onClick={() => onEdit(p)}
                className="py-1 px-2 flex items-center justify-center gap-1 bg-orange-50 border-2 border-orange-200 text-orange-600 rounded-lg text-[7px] sm:text-xs font-bold"
              >
                <Pencil className="w-2.5 h-2.5 md:w-3 md:h-3 md:mb-0.5" />
                <span className="hidden md:inline">Edit</span>
              </button>
              <button
                onClick={() => onDeleteConfirm(p.id)}
                className="py-1 flex items-center gap-0.5 justify-center bg-gray-50 border-2 border-gray-200 text-gray-500 rounded-lg text-[7px] sm:text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                <Trash2 className="w-2.5 h-2.5 md:w-3 md:h-3 md:mb-0.5" />
                <span className="hidden md:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}