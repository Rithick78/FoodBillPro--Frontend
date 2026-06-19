import { Upload, X } from 'lucide-react'

export default function ImageUpload({ preview, onUpload, onClear, height = 'h-48' }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Product Image
        <span className="text-gray-400 font-normal ml-1">(optional)</span>
      </label>
      {preview ? (
        <div className={`relative ${height} rounded-2xl overflow-hidden border-2 border-orange-200`}>
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow">
            <X className="w-4 h-4" />
          </button>
          {/* Change photo label */}
          <label className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer font-semibold transition-colors">
            Change Photo
            <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
          </label>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center ${height} rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all group`}>
          <Upload className="w-8 h-8 text-gray-300 group-hover:text-orange-400 mb-3 transition-colors" />
          <span className="text-sm font-semibold text-gray-500">Click to upload image</span>
          <span className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB</span>
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      )}
    </div>
  )
}