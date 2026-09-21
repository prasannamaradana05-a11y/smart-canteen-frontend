import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const result = await login(email, password)

      if (!result.success) {
        alert(result.message || "Invalid admin credentials")
        return
      }

      if (result.user.role !== "admin") {
        alert("This account is not an admin account.")
        return
      }

      alert("Admin login successful!")
      navigate("/admin/dashboard")

    } catch (error) {
      console.error("Admin login error:", error)
      alert("Unable to connect to the backend.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Admin Login</h1>

        <p>Login to manage Smart Canteen</p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Admin Login"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default AdminLogin
