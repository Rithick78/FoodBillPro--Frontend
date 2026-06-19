import { useState } from 'react'
import { useAppDispatch } from '../../../../hooks/useAppSelector'
import { addToCart, removeFromCart } from '../../../../features/billing/billingSlice'

const CATS = ['ALL', 'BURGER', 'PIZZA', 'DESSERT', 'JUICE', 'SNACKS']
const EMOJI = { BURGER: '🍔', PIZZA: '🍕', DESSERT: '🍰', JUICE: '🥤', SNACKS: '🍟' }

export default function ItemPicker({ items, cart }) {
  const dispatch = useAppDispatch()
  const [filterCat, setFilterCat] = useState('ALL')
  const [search, setSearch] = useState('')

  const available = items.filter(p => p.available)
  const filtered = available
    .filter(p => filterCat === 'ALL' || p.category === filterCat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const qty = (id) => cart.find(i => i.id === id)?.quantity || 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-5">

      {/* Search */}
      <div className="relative mb-3">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5 flex-wrap mb-3">
        {CATS.map(c => (
          <button key={c} onClick={() => setFilterCat(c)}
            className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all ${
              filterCat === c
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-orange-50'}`}>
            {c === 'ALL' ? 'All' : `${EMOJI[c]} ${c}`}
          </button>
        ))}
      </div>

      {/* scrollable list */}
      <div className="flex flex-col gap-2 max-h-[55vh] overflow-y-auto pr-0.5">
        {filtered.map(p => {
          const q = qty(p.id)
          return (
            <div key={p.id}
              className="flex items-center gap-2 p-2 sm:p-3 rounded-xl border-2 border-gray-50 hover:border-orange-200 transition-all">

              {/* Image */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-orange-50 overflow-hidden shrink-0">
                {p.imageData
                  ? <img src={p.imageData} alt={p.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-lg sm:text-2xl">
                      {EMOJI[p.category]}
                    </div>}
              </div>

              {/* Name + price */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-xs sm:text-sm truncate">{p.name}</p>
                <p className="text-orange-600 font-bold text-xs sm:text-sm">Rs.{p.price}</p>
              </div>

              {/* Qty controls */}
              {q === 0
                ? <button
                    onClick={() => dispatch(addToCart(p))}
                    className="shrink-0 bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-700">
                    Add
                  </button>
                : <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => dispatch(removeFromCart(p.id))}
                      className="w-6 h-6 sm:w-7 sm:h-7 bg-orange-100 text-orange-700 rounded-lg font-bold hover:bg-orange-200 text-sm flex items-center justify-center">
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-gray-800 text-xs sm:text-sm">
                      {q}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(p))}
                      className="w-6 h-6 sm:w-7 sm:h-7 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 text-sm flex items-center justify-center">
                      +
                    </button>
                  </div>}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}