import { createContext, useContext, useState } from "react"
import { api } from "../services/api"

const AuthContext = createContext()

function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      return JSON.parse(savedUser)
    }

    return null
  })

  const login = async (email, password) => {

    const result = await api.post("/auth/login", {
      email,
      password
    })

    if (result.success) {
      setUser(result.user)
      localStorage.setItem("user", JSON.stringify(result.user))
    }

    return result
  }

  const register = async (name, email, password) => {

    const result = await api.post("/auth/register", {
      name,
      email,
      password
    })

    return result
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider