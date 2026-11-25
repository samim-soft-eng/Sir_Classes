import { Navigate, Outlet } from 'react-router-dom'
import { useStore } from '../../context/StoreContext.jsx'

function ProtectedRoute() {
  const { user } = useStore()
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
