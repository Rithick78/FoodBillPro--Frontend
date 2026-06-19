import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector'
import { loginAdmin, clearError } from '../../features/auth/authSlice'
import { toast } from 'sonner'
import { ChefHat, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error, token } = useAppSelector((s) => s.auth)
  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const [form, setForm] = useState({ username: '', password: '' })
  const [show, setShow] = useState(false)
  const [isDemo, setIsDemo] = useState(false)

  // Guest View 
  useEffect(() => {
    if (location.state?.demo) {
      setForm({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD
      })
      setIsDemo(true)
    }
  }, [location.state])

  useEffect(() => { if (token) navigate('/admin/dashboard') }, [token, navigate])

  useEffect(() => {
    if (error) { toast.error(error); dispatch(clearError()) }
  }, [error, dispatch])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.username || !form.password) {
      toast.error('Fill all fields')
      return
    }
    const res = await dispatch(loginAdmin(form))
    if (loginAdmin.fulfilled.match(res)) {
      toast.success('Welcome back!')
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

          {/* Top */}
          <div className="bg-linear-to-r from-orange-600 to-orange-500 px-6 pt-8 pb-6 text-white text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-extrabold">FoodBill Pro</h1>
            <p className="text-orange-100 text-xs mt-0.5">Admin Portal</p>
          </div>

          {/* Demo banner */}
          {isDemo && (
            <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-amber-700 font-semibold">
                Demo credentials pre-filled — click Sign In to explore
              </p>
            </div>
          )}

          {/* Form */}
          <div className="px-6 py-6">
            <h2 className="text-base font-bold text-gray-800 mb-0.5">Sign in</h2>
            <p className="text-xs text-gray-400 mb-5">Access your admin dashboard</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  placeholder="Enter username"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none text-sm bg-gray-50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {show
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm mt-2"
              >
                {loading
                  ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : 'Sign In'}
              </button>
            </form>

            <button
              onClick={() => navigate('/')}
              className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
            >
              Back to Home
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-4">
          FoodBill Pro &copy; 2026
        </p>
      </div>
    </div>
  )
}