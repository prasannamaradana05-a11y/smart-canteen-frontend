import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        Smart Canteen
      </div>

      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/orders">My Orders</Link>

        <Link to="/cart" className="cart-link">
          Cart
          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}
        </Link>

        <Link to="/profile">Profile</Link>
      </div>

      <div className="navbar-actions">

        {user ? (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}

      </div>

    </nav>
  )
}

export default Navbar