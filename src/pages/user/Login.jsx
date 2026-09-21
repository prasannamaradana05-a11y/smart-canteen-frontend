import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [loginType, setLoginType] = useState("user")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!emailPattern.test(email.trim())) {
      alert("Please enter a valid email address.")
      return
    }

    try {
      // Send email and password to backend
      const result = await login(email.trim(), password)

      // Backend login failed
      if (!result.success) {
        alert(result.message || "Login failed")
        return
      }

      // Check actual role from MongoDB
      if (loginType === "admin" && result.user.role !== "admin") {
        alert("This account is not an admin account.")
        return
      }

      if (loginType === "user" && result.user.role === "admin") {
        alert("Please use Admin Login for this account.")
        return
      }

      // Login successful
      if (loginType === "admin") {
        alert("Admin login successful!")
        navigate("/admin/dashboard")
      } else {
        alert("Login successful!")
        navigate("/home")
      }

    } catch (error) {
      console.error("Login error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Login</h1>

        <p>
          Login to your Smart Canteen account
        </p>

        {/* User / Admin Selection */}

        <div className="login-type-switch">

          <button
            type="button"
            className={
              loginType === "user"
                ? "login-type-btn active"
                : "login-type-btn"
            }
            onClick={() => setLoginType("user")}
          >
            User Login
          </button>

          <button
            type="button"
            className={
              loginType === "admin"
                ? "login-type-btn active"
                : "login-type-btn"
            }
            onClick={() => setLoginType("admin")}
          >
            Admin Login
          </button>

        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder={
                loginType === "admin"
                  ? "Enter admin email"
                  : "Enter your email"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            {loginType === "admin"
              ? "Admin Login"
              : "Login"}
          </button>

        </form>

        {loginType === "user" && (
          <p className="auth-link">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        )}

      </div>
    </div>
  )
}

export default Login