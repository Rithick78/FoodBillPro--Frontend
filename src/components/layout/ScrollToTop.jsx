import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-11 h-11 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all z-40"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  )
}