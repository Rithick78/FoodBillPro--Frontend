import { useNavigate } from 'react-router-dom'
import { ChefHat, UtensilsCrossed, ShieldCheck } from 'lucide-react'

export default function EntryPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-orange-100 flex flex-col items-center justify-center px-4">

      {/*Logo*/}
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 mb-4">
          <ChefHat className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          FoodBill Pro
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Restaurant Management System
        </p>
      </div>

      {/*Cards*/}
      <div className="w-full max-w-sm grid grid-cols-2 gap-4">

        {/*Customer*/}
        <button
          onClick={() => navigate('/menu')}
          className="group bg-white border-2 border-gray-100 hover:border-orange-400 rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center transition-colors">
            <UtensilsCrossed className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-800 text-sm">Customer</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Browse the menu</p>
          </div>
          <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full w-full text-center group-hover:bg-orange-100 transition-colors">
            View Menu
          </span>
        </button>

        {/*Admin*/}
        <button
          onClick={() => navigate('/admin/login')}
          className="group bg-white border-2 border-gray-100 hover:border-gray-700 rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="w-12 h-12 bg-gray-50 group-hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors">
            <ShieldCheck className="w-6 h-6 text-gray-700" />
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-800 text-sm">Admin</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Manage & billing</p>
          </div>
          <span className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full w-full text-center group-hover:bg-gray-100 transition-colors">
            Sign In
          </span>
        </button>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-[11px] text-gray-400 font-medium">
          Want to explore the admin panel?
        </p>
        <button
          onClick={() => {
            {/*Auto-fill demo guest*/}
            navigate('/admin/login', { state: { demo: true } })
          }}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-orange-600 bg-white border border-gray-200 hover:border-orange-300 px-4 py-2 rounded-full transition-all hover:shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Guest View — Demo Access
        </button>
      </div>

      {/*Footer*/}
      <p className="absolute bottom-5 text-[11px] text-gray-400">
        FoodBill Pro &copy; 2026
      </p>
    </div>
  )
}