import { Navigate, Outlet } from 'react-router-dom'
import { useStore } from '../../context/StoreContext.jsx'

function GuestRoute() {
  const { user } = useStore()
  return user ? <Navigate to="/" replace /> : <Outlet />
}

export default GuestRoute
