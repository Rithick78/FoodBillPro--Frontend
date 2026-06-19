import { useAppSelector } from '../hooks/useAppSelector'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const token = useAppSelector((state) => state.auth.token)
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

export default ProtectedRoute