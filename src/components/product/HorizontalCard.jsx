const EMOJI = { BURGER: '🍔', PIZZA: '🍕', DESSERT: '🍰', JUICE: '🥤', SNACKS: '🍟' }

export default function HorizontalCard({ product }) {
  return (
    <div className="shrink-0 w-48 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="relative h-32 bg-orange-50 overflow-hidden">

        {/* ✅ imageData instead of imageUrl */}
        {product.imageData
          ? <img src={product.imageData} alt={product.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-4xl">
              {EMOJI[product.category]}
            </div>
        }

        <span className={`absolute top-2 left-2 w-4 h-4 rounded-sm border-2 border-white flex items-center justify-center ${
          product.vegType === 'VEG' ? 'bg-green-500' : 'bg-red-500'}`}>
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </span>

        {Boolean(product.isSignature) && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            BEST
          </span>
        )}
        {Boolean(product.isFastMoving) && !Boolean(product.isSignature) && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            HOT
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="font-bold text-gray-800 text-xs truncate">{product.name}</p>
        <p className="text-orange-600 font-extrabold text-sm mt-1">Rs.{product.price}</p>
      </div>
    </div>
  )
}