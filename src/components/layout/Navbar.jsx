import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelector'
import { logout } from '../../features/auth/authSlice'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard, UtensilsCrossed, PlusSquare,
  Receipt, Users, LogOut, Menu, X, ChefHat,
} from 'lucide-react'

const adminLinks = [
  { to: '/admin/dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { to: '/admin/products',    label: 'Products',    icon: UtensilsCrossed },
  { to: '/admin/add-product', label: 'Add Product', icon: PlusSquare },
  { to: '/admin/billing',     label: 'Billing',     icon: Receipt },
  { to: '/admin/customers',   label: 'Customers',   icon: Users },
]

export default function Navbar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const token = useAppSelector((s) => s.auth.token)
  const username = useAppSelector((s) => s.auth.username)
  const isAdmin = location.pathname.startsWith('/admin')
  const isMenu = location.pathname === '/menu'
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  function handleLogout() {
    dispatch(logout())
    navigate('/admin/login')
  }

  return (
    <nav className="bg-orange-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to={isMenu ? '/menu' : isAdmin && token ? '/admin/dashboard' : '/'}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
              <span className="text-white font-extrabold text-base tracking-wide">
                <span className='text-black'>FoodBill</span> Pro
              </span>
          </Link>

          {/* Desktop */}
          <div className="flex items-center gap-1">

            {isMenu && (
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-0.5 sm:gap-1.5 text-orange-100 hover:text-white hover:bg-white/30 bg-white/20 text-sm font-semibold px-3 py-1.5 rounded-xl transition-all"
              >
                <X className="w-4 h-4 mt-0.5" />
                Exit
              </button>
            )}

            {isAdmin && token && (
              <>
                <div className="hidden md:flex items-center gap-0.5">
                  {adminLinks.map(({ to, label, icon: Icon }) => {
                    const active = location.pathname === to
                    return (
                      <Link key={to} to={to}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                          active
                            ? 'bg-white/20 text-white'
                            : 'text-orange-100 hover:bg-white/10 hover:text-white'
                        }`}>
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                      </Link>
                    )
                  })}
                </div>

                <div className="hidden md:block w-px h-6 bg-orange-400 mx-2" />

                  <button onClick={handleLogout}
                    className="hidden md:flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-sm">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
              </>
            )}

            {isAdmin && !token && (
              <Link to="/"
                className="text-orange-100 hover:text-white text-sm font-semibold transition-colors flex items-center gap-1.5">
                <X className="w-4 h-4" /> Back
              </Link>
            )}
          </div>

          {/* Mobile hamburger — keeping your existing logic */}

          {isAdmin && token && (<button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-white"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>)}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-orange-500 bg-orange-700">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">

            {isAdmin && token && (
              <>
                {adminLinks.map(({ to, label, icon: Icon }) => {
                  const active = location.pathname === to
                  return (
                    <Link key={to} to={to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        active ? 'bg-white/20 text-white' : 'text-orange-100 hover:bg-white/10 hover:text-white'
                      }`}>
                      <Icon className="w-4 h-4 shrink-0" />
                      {label}
                    </Link>
                  )
                })}
                <div className="border-t border-orange-500 mt-2 pt-3 px-4">
                  <button onClick={handleLogout}
                    className="flex items-center gap-2 bg-white text-orange-600 text-sm font-bold px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}