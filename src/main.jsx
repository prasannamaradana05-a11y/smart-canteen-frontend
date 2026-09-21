import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import AuthProvider from "./context/AuthContext"
import CartProvider from "./context/CartContext"
import FoodProvider from "./context/FoodContext"

import "./index.css"
import "./App.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FoodProvider>
            <App />
          </FoodProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)