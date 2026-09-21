import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function AdminProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  if (user.role !== "admin") {
    return <Navigate to="/home" replace />
  }

  return children
}

export default AdminProtectedRoute