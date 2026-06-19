import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import ImageUpload from './ImageUpload'
import VegToggle from './VegToggle'
import BadgeToggle from './BadgeToggle'

const CATS = ['BURGER', 'PIZZA', 'DESSERT', 'JUICE', 'SNACKS']
const EMOJI = { BURGER: '🍔', PIZZA: '🍕', DESSERT: '🍰', JUICE: '🥤', SNACKS: '🍟' }

export default function EditProductModal({ product, onSave, onClose, saving }) {
  const [form, setForm] = useState({
    name: '',
    category: 'BURGER',
    price: '',
    description: '',
    vegType: 'VEG',
    isSignature: false,
    isFastMoving: false,
  })
  const [editImg, setEditImg] = useState(null)
  const [editPreview, setEditPreview] = useState(null)

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description || '',
        vegType: product.vegType || 'VEG',
        isSignature: Boolean(product.isSignature),
        isFastMoving: Boolean(product.isFastMoving),
      })
      setEditImg(null)
      setEditPreview(product.imageData  || null)
    }
  }, [product])

  if (!product) return null

  function handleImage(e) {
    const f = e.target.files[0]
    if (!f) return
    setEditImg(f)
    setEditPreview(URL.createObjectURL(f))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('name', form.name.trim())
    fd.append('category', form.category)
    fd.append('price', form.price)
    fd.append('description', form.description.trim())
    fd.append('vegType', form.vegType)
    fd.append('isSignature', form.isSignature)
    fd.append('isFastMoving', form.isFastMoving)
    if (editImg) fd.append('image', editImg)
    onSave(fd)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="text-base font-bold text-gray-800">
            Edit — {product.name}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          <ImageUpload
            preview={editPreview}
            onUpload={handleImage}
            onClear={() => { setEditImg(null); setEditPreview(null) }}
            height="h-40"
          />

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50">
              {CATS.map(c => (
                <option key={c} value={c}>{EMOJI[c]} {c}</option>
              ))}
            </select>
          </div>

          {/* Veg toggle */}
          <VegToggle
            value={form.vegType}
            onChange={v => setForm({ ...form, vegType: v })}
          />

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Price (Rs.) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
                Rs.
              </span>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                min="1"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50 resize-none"
            />
          </div>

          {/* Badge toggle */}
          <BadgeToggle
            isSignature={form.isSignature}
            isFastMoving={form.isFastMoving}
            onChange={(key, value) => setForm(prev => ({ ...prev, [key]: value }))}
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold disabled:opacity-60 flex items-center justify-center gap-2 transition-colors">
              {saving
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}