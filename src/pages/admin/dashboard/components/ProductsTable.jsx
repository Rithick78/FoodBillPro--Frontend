import { useAppDispatch } from '../../../../hooks/useAppSelector'
import { toggleSignature, toggleFastMoving } from '../../../../features/products/productSlice'

export default function ProductsTable({ items }) {
  const dispatch = useAppDispatch()

  if (items.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center py-10">No products yet</p>
    )
  }

  return (
    <>
      {/* card list */}
      <div className="block sm:hidden divide-y divide-gray-50 ">
        {items.map((p, i) => (
          <div key={p.id} className="px-2 py-4 border-t border-gray-200 mx-0.5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs text-gray-400">{i + 1}.</span>
                  <p className="text-sm font-bold text-gray-800 truncate">{p.name}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {p.category}
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.vegType === 'VEG'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      p.vegType === 'VEG' ? 'bg-green-500' : 'bg-red-500'}`} />
                    {p.vegType === 'VEG' ? 'Veg' : 'Non-Veg'}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'}`}>
                    {p.available ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-orange-600 shrink-0">
                Rs.{p.price}
              </span>
            </div>

            {/* Badge toggles */}
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(toggleSignature(p.id))}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border-2 transition-all ${
                  Boolean(p.isSignature)
                    ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
                    : 'bg-white border-gray-200 text-gray-400'}`}>
                {Boolean(p.isSignature) ? 'Best ON' : 'Mark Best'}
              </button>
              <button
                onClick={() => dispatch(toggleFastMoving(p.id))}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border-2 transition-all ${
                  Boolean(p.isFastMoving)
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-white border-gray-200 text-gray-400'}`}>
                {Boolean(p.isFastMoving) ? 'Popular ON' : 'Mark Popular'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/*table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['#', 'Name', 'Category', 'Type', 'Price', 'Status', 'Badges'].map(h => (
                <th key={h}
                  className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((p, i) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-xs text-gray-400">{i + 1}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 text-sm">{p.name}</td>
                <td className="px-4 py-3">
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1.5 w-fit text-xs font-bold px-2.5 py-1 rounded-full ${
                    p.vegType === 'VEG'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'}`}>
                    <span className={`w-2 h-2 rounded-full ${
                      p.vegType === 'VEG' ? 'bg-green-500' : 'bg-red-500'}`} />
                    {p.vegType === 'VEG' ? 'Veg' : 'Non-Veg'}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-orange-600 text-sm">
                  Rs.{p.price}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    p.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'}`}>
                    {p.available ? 'Available' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(toggleSignature(p.id))}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all whitespace-nowrap ${
                        Boolean(p.isSignature)
                          ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                          : 'bg-white border-gray-200 text-gray-400 hover:border-yellow-200'}`}>
                      Best
                    </button>
                    <button
                      onClick={() => dispatch(toggleFastMoving(p.id))}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all whitespace-nowrap ${
                        Boolean(p.isFastMoving)
                          ? 'bg-red-100 border-red-300 text-red-700'
                          : 'bg-white border-gray-200 text-gray-400 hover:border-red-200'}`}>
                      Popular
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}