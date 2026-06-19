import { useState } from 'react'
import ImageUpload from './ImageUpload'
import VegToggle from './VegToggle'
import BadgeToggle from './BadgeToggle'

const CATS = ['BURGER', 'PIZZA', 'DESSERT', 'JUICE', 'SNACKS']
const EMOJI = { BURGER: '🍔', PIZZA: '🍕', DESSERT: '🍰', JUICE: '🥤', SNACKS: '🍟' }

const INIT = {
  name: '',
  category: 'BURGER',
  price: '',
  description: '',
  vegType: 'VEG',
  isSignature: false,
  isFastMoving: false,
}

export default function ProductForm({ onSubmit, saving }) {
  const [form, setForm] = useState(INIT)
  const [img, setImg] = useState(null)
  const [preview, setPreview] = useState(null)

  function handleImage(e) {
    const f = e.target.files[0]
    if (!f) return
    setImg(f)
    setPreview(URL.createObjectURL(f))
  }

  function handleBadge(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('name', form.name.trim())
    fd.append('category', form.category)
    fd.append('price', form.price)
    fd.append('description', form.description.trim())
    fd.append('vegType', form.vegType)
    fd.append('isSignature', form.isSignature)
    fd.append('isFastMoving', form.isFastMoving)
    if (img) fd.append('image', img)
    const success = await onSubmit(fd)
    if (success) {
      setForm(INIT)
      setImg(null)
      setPreview(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">

      {/* Image */}
      <ImageUpload
        preview={preview}
        onUpload={handleImage}
        onClear={() => { setImg(null); setPreview(null) }}
        height="h-28 sm:h-40"
      />

      {/* Name + Category — side by side */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Chicken Burger"
            className="w-full px-2.5 py-2 rounded-lg border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-xs bg-gray-50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-gray-600 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full px-2.5 py-2 rounded-lg border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-xs bg-gray-50 transition-colors"
          >
            {CATS.map(c => (
              <option key={c} value={c}>{EMOJI[c]} {c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Veg / Non-Veg */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
          Veg / Non-Veg <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setForm({ ...form, vegType: 'VEG' })}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border-2 text-xs font-bold transition-all ${
              form.vegType === 'VEG'
                ? 'bg-green-50 border-green-400 text-green-700'
                : 'bg-white border-gray-200 text-gray-400'}`}>
            <VegDot color="green" /> Veg
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, vegType: 'NON_VEG' })}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border-2 text-xs font-bold transition-all ${
              form.vegType === 'NON_VEG'
                ? 'bg-red-50 border-red-400 text-red-700'
                : 'bg-white border-gray-200 text-gray-400'}`}>
            <VegDot color="red" /> Non-Veg
          </button>
        </div>
      </div>

      {/* Price + Description side by side on mobile */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 mb-1">
            Price (Rs.) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[11px]">
              Rs.
            </span>
            <input
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="0"
              min="1"
              className="w-full pl-8 pr-2.5 py-2 rounded-lg border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-xs bg-gray-50 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-gray-600 mb-1">
            Description
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Ingredients, taste..."
            rows={2}
            className="w-full px-2.5 py-2 rounded-lg border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-xs bg-gray-50 resize-none transition-colors"
          />
        </div>
      </div>

      {/* Badges */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
          Badges
          <span className="text-gray-400 font-normal ml-1">(optional)</span>
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleBadge('isSignature', !form.isSignature)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border-2 text-xs font-bold transition-all ${
              form.isSignature
                ? 'bg-yellow-50 border-yellow-400 text-yellow-800'
                : 'bg-white border-gray-200 text-gray-400'}`}>
            <span>★</span>
            Signature
            {form.isSignature && (
              <span className="bg-yellow-200 text-yellow-800 text-[9px] px-1 py-0.5 rounded-full">
                ON
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleBadge('isFastMoving', !form.isFastMoving)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border-2 text-xs font-bold transition-all ${
              form.isFastMoving
                ? 'bg-red-50 border-red-400 text-red-700'
                : 'bg-white border-gray-200 text-gray-400'}`}>
            <span>▲</span>
            Popular
            {form.isFastMoving && (
              <span className="bg-red-200 text-red-800 text-[9px] px-1 py-0.5 rounded-full">
                ON
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-1" />

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
      >
        {saving
          ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Adding...</>
          : 'Add Product'}
      </button>
    </form>
  )
}

function VegDot({ color }) {
  return (
    <span className={`w-3 h-3 rounded flex items-center justify-center ${
      color === 'green' ? 'bg-green-500' : 'bg-red-500'}`}>
      <span className="w-1.5 h-1.5 bg-white rounded-full" />
    </span>
  )
}