import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector'
import { fetchPublicProducts } from '../../features/products/productSlice'
import ProductCard from '../../components/product/ProductCard'
import ProductSkeleton from '../../components/product/ProductSkeleton'
import HorizontalCard from '../../components/product/HorizontalCard'

const BANNERS = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=1400&auto=format&fit=crop&q=80',
]

const CATEGORIES = [
  { key: 'ALL', label: 'All Items' },
  { key: 'BURGER', label: 'Burger' },
  { key: 'PIZZA', label: 'Pizza' },
  { key: 'DESSERT', label: 'Dessert' },
  { key: 'JUICE', label: 'Juice' },
  { key: 'SNACKS', label: 'Snacks' },
]

const VEG_FILTERS = [
  { key: 'ALL', label: 'All' },
  { key: 'VEG', label: 'Veg' },
  { key: 'NON_VEG', label: 'Non-Veg' },
]

export default function UserMenu() {
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector((s) => s.products)
  const [cat, setCat] = useState('ALL')
  const [vegFilter, setVegFilter] = useState('ALL')
  const [slide, setSlide] = useState(0)

  useEffect(() => { dispatch(fetchPublicProducts()) }, [dispatch])

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % BANNERS.length), 3500)
    return () => clearInterval(t)
  }, [])

  {/*Signature & Fast Moving*/}
  const availableItems = items.filter(p => p.available !== false)
  const signatureItems = availableItems.filter(p => Boolean(p.isSignature)).slice(0, 5)
  const fastMovingItems = availableItems.filter(p => Boolean(p.isFastMoving)).slice(0, 5)

  {/*Main grid all products*/}
  const filtered = items
    .filter(p => cat === 'ALL' || p.category === cat)
    .filter(p => vegFilter === 'ALL' || p.vegType === vegFilter)

  return (
    <div className="min-h-screen bg-gray-50">

      {/*Banner Slider*/}
      <div className="relative h-70 sm:h-95 md:h-115 overflow-hidden">
        {BANNERS.map((url, i) => (
          <img key={i} src={url} alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Welcome to FoodBill Pro
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
            Delicious Food<br />
            <span className="text-orange-400">Delivered Fresh</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-sm">
            Browse our menu and place your order with our admin
          </p>
        </div>
        {/*Dots*/}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${i === slide ? 'w-6 h-2 bg-orange-400' : 'w-2 h-2 bg-white/50'}`} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/*Signature Items Row*/}
        {signatureItems.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-yellow-400 rounded-full" />
              <h2 className="text-lg font-extrabold text-gray-800">Signature Items</h2>
              <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                Chef's Best
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
              {signatureItems.map(p => <HorizontalCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/*Fast Moving Row*/}
        {fastMovingItems.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-red-500 rounded-full" />
              <h2 className="text-lg font-extrabold text-gray-800">Fast Moving</h2>
              <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                Popular Now
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
              {fastMovingItems.map(p => <HorizontalCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/*Category Tabs*/}
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c.key} onClick={() => setCat(c.key)}
                className={`px-3 py-1.5 rounded-lg border-2 text-xs font-bold whitespace-nowrap transition-all ${cat === c.key
                  ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300'}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/*Veg / Non-Veg Filter */}
        <div className="mt-3 flex items-center gap-2">
          {VEG_FILTERS.map(f => (
            <button key={f.key} onClick={() => setVegFilter(f.key)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border-2 transition-all ${vegFilter === f.key
                ? 'bg-gray-800 border-gray-800 text-white'
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'}`}>
              {f.key !== 'ALL' && (
                <span className={`w-2 h-2 rounded-full shrink-0 ${f.key === 'VEG' ? 'bg-green-500' : 'bg-red-500'}`} />
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/*Products Grid*/}
        <div className="mt-4 pb-16">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-extrabold text-gray-800">
              {CATEGORIES.find(c => c.key === cat)?.label}
              {!loading && (
                <span className="text-xs font-normal text-gray-400 ml-1.5">
                  ({filtered.length} items)
                </span>
              )}
            </h2>
          </div>

          {/*Skeleton*/}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          )}

          {/*Error
          {error && (
            <div className="flex flex-col items-center py-16 text-center">
              <svg className="w-12 h-12 text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-sm font-bold text-gray-600">Backend not connected</p>
              <p className="text-xs text-gray-400 mt-1">Start your Spring Boot server</p>
            </div>
          )}

          {/*Empty*/}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <svg className="w-12 h-12 text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-sm font-bold text-gray-600">No items here yet</p>
              <p className="text-xs text-gray-400 mt-1">
                {vegFilter !== 'ALL' ? 'Try changing the veg filter' : 'Admin has not added any items'}
              </p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

       {/*Footer*/}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-bold">FoodBill Pro</p>
          <p className="text-gray-400 text-sm mt-1">
            Contact your admin to place an order
          </p>
        </div>
      </footer>
    </div>
  )
}