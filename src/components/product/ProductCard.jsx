const EMOJI = { BURGER: '🍔', PIZZA: '🍕', DESSERT: '🍰', JUICE: '🥤', SNACKS: '🍟' }

export default function ProductCard({ product }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col ${
      !product.available ? 'opacity-75' : ''}`}>

      <div className="relative h-32 sm:h-40 bg-orange-50 overflow-hidden">

        {/* ✅ imageData instead of imageUrl */}
        {product.imageData
          ? <img
              src={product.imageData}
              alt={product.name}
              className={`w-full h-full object-cover hover:scale-105 transition-transform duration-500 ${
                !product.available ? 'grayscale' : ''}`}
            />
          : <div className="w-full h-full flex items-center justify-center text-4xl">
              {EMOJI[product.category]}
            </div>
        }

        {/* Veg dot */}
        <div className={`absolute top-1.5 left-1.5 w-4 h-4 rounded border-2 border-white flex items-center justify-center shadow ${
          product.vegType === 'VEG' ? 'bg-green-500' : 'bg-red-500'}`}>
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>

        {/* Stock status */}
        <div className={`absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
          product.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {product.available ? 'Available' : 'Out of Stock'}
        </div>

        {/* Category */}
        <span className="absolute bottom-1.5 left-1.5 bg-orange-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
          {product.category}
        </span>

        {/* Badges */}
        {Boolean(product.isSignature) && (
          <span className="absolute bottom-1.5 right-1.5 bg-yellow-400 text-yellow-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            BEST
          </span>
        )}
        {Boolean(product.isFastMoving) && !Boolean(product.isSignature) && (
          <span className="absolute bottom-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            POPULAR
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-1 rounded-full tracking-wide">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      <div className="p-2.5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-xs leading-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2 flex-1 leading-snug">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2 gap-1">
          <span className={`text-sm font-extrabold ${
            product.available ? 'text-orange-600' : 'text-gray-400'}`}>
            Rs.{product.price}
          </span>
          <span className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${
            product.vegType === 'VEG'
              ? 'text-green-700 bg-green-50 border-green-200'
              : 'text-red-700 bg-red-50 border-red-200'}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              product.vegType === 'VEG' ? 'bg-green-500' : 'bg-red-500'}`} />
            {product.vegType === 'VEG' ? 'Veg' : 'Non-Veg'}
          </span>
        </div>
      </div>
    </div>
  )
}