import { useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"
import AdminNavbar from "./components/AdminNavbar"
import AppRoutes from "./routes/AppRoutes"
import { useAuth } from "./context/AuthContext"

function App() {
  const location = useLocation()
  const { user } = useAuth()

  const isAdmin = user?.role === "admin"

  const isAdminPage =
    location.pathname.startsWith("/admin")

  return (
    <>
      {isAdmin && isAdminPage ? <AdminNavbar /> : <Navbar />}

      <AppRoutes />
    </>
  )
}

export default App