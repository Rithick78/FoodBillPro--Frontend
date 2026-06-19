export default function VegToggle({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Veg / Non-Veg <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange('VEG')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
            value === 'VEG'
              ? 'bg-green-50 border-green-400 text-green-700'
              : 'bg-white border-gray-200 text-gray-400 hover:border-green-200'}`}>
          <VegDot color="green" /> Veg
        </button>
        <button
          type="button"
          onClick={() => onChange('NON_VEG')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
            value === 'NON_VEG'
              ? 'bg-red-50 border-red-400 text-red-700'
              : 'bg-white border-gray-200 text-gray-400 hover:border-red-200'}`}>
          <VegDot color="red" /> Non-Veg
        </button>
      </div>
    </div>
  )
}

export function VegDot({ color }) {
  return (
    <span className={`w-4 h-4 rounded flex items-center justify-center ${
      color === 'green' ? 'bg-green-500' : 'bg-red-500'}`}>
      <span className="w-1.5 h-1.5 bg-white rounded-full" />
    </span>
  )
}