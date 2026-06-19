export default function Spinner({ size = 'md', text = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-14 h-14' }
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className={`${sizes[size]} border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin`} />
      {text && <p className="text-sm text-gray-400 font-medium">{text}</p>}
    </div>
  )
}