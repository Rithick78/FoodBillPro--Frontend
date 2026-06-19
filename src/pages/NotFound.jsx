import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-8xl mb-6">🍽️</p>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">404</h1>
        <p className="text-lg font-semibold text-gray-600 mb-1">Page not found</p>
        <p className="text-sm text-gray-400 mb-8">Looks like this page went out of the menu!</p>
        <Link to="/"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          ← Back to Menu
        </Link>
      </div>
    </div>
  )
}