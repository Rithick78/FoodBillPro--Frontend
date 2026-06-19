import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './app/store'
import './index.css'

import Layout from './components/layout/Layout'
import ProtectedRoute from './router/ProtectedRoute'
import EntryPage from './pages/EntryPage'
import UserMenu from './pages/user/UserMenu'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/dashboard/Dashboard'
import AddProduct from './pages/admin/products/AddProduct'
import AllProducts from './pages/admin/products/AllProducts'
import BillingPage from './pages/admin/billing/BillingPage'
import CustomersPage from './pages/admin/customers/CustomersPage'
import NotFound from './pages/NotFound'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/menu" element={<Layout><UserMenu /></Layout>} />
          <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />
          <Route path="/admin/dashboard" element={<Layout><ProtectedRoute><Dashboard /></ProtectedRoute></Layout>} />
          <Route path="/admin/add-product" element={<Layout><ProtectedRoute><AddProduct /></ProtectedRoute></Layout>} />
          <Route path="/admin/products" element={<Layout><ProtectedRoute><AllProducts /></ProtectedRoute></Layout>} />
          <Route path="/admin/billing" element={<Layout><ProtectedRoute><BillingPage /></ProtectedRoute></Layout>} />
          <Route path="/admin/customers" element={<Layout><ProtectedRoute><CustomersPage /></ProtectedRoute></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)