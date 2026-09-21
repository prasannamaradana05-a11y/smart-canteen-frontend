import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function AdminNavbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (
    <nav className="navbar admin-navbar">

      <div className="navbar-logo">
        Smart Canteen Admin
      </div>

      <div className="navbar-links">

        <Link to="/admin/dashboard">
          Dashboard
        </Link>

        <Link to="/admin/food">
          Manage Food
        </Link>

        <Link to="/admin/orders">
          Manage Orders
        </Link>

        <Link to="/admin/feedback">
          Feedback
        </Link>

      </div>

      <div className="navbar-actions">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default AdminNavbar