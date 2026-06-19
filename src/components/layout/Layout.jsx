import { Toaster } from '../ui/sonner'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
    </div>
  )
}