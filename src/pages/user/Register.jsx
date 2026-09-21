import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    try {
      // Send registration data to backend
      const result = await register(
        name.trim(),
        email.trim(),
        password
      )

      // Backend registration failed
      if (!result.success) {
        alert(result.message || "Registration failed")
        return
      }

      // Registration successful
      alert("Registration successful!")

      // Go to login page
      navigate("/login")

    } catch (error) {
      console.error("Registration error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Create Account</h1>
        <p>Register for Smart Canteen</p>

        <form onSubmit={handleRegister}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength="2"
              maxLength="50"
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Enter a valid email address"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}"
              title="Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
            />

            <small>
              Minimum 8 characters, including uppercase, lowercase,
              number and special character.
            </small>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>

        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Register