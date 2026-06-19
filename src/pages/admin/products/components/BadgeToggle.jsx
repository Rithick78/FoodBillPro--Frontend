export default function BadgeToggle({ isSignature, isFastMoving, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Product Badges
        <span className="text-gray-400 font-normal ml-1">(optional)</span>
      </label>
      <p className="text-xs text-gray-400 mb-3">
        These appear on user menu as highlighted rows
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange('isSignature', !isSignature)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
            isSignature
              ? 'bg-yellow-50 border-yellow-400 text-yellow-800'
              : 'bg-white border-gray-200 text-gray-400 hover:border-yellow-200'}`}>
          <span className="text-base">★</span>
          Signature
          {isSignature && (
            <span className="text-xs bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded-full">
              ON
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => onChange('isFastMoving', !isFastMoving)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
            isFastMoving
              ? 'bg-red-50 border-red-400 text-red-700'
              : 'bg-white border-gray-200 text-gray-400 hover:border-red-200'}`}>
          <span className="text-base">▲</span>
          Popular
          {isFastMoving && (
            <span className="text-xs bg-red-200 text-red-800 px-1.5 py-0.5 rounded-full">
              ON
            </span>
          )}
        </button>
      </div>
    </div>
  )
}