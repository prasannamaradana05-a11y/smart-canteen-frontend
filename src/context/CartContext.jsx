import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { api } from "../services/api"
import { useAuth } from "./AuthContext"

const CartContext = createContext()

function CartProvider({ children }) {
  const { user } = useAuth()

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Get cart from backend
  const fetchCart = async () => {
    if (!user?.id) {
      setCartItems([])
      return
    }

    try {
      setLoading(true)

      const result = await api.get(
        `/cart?userId=${user.id}`
      )

      if (result.success) {
        const items = result.cart?.items || []

        const menuResult = await api.get("/menu")

const formattedItems = items.map(item => {
  const menuItem = menuResult.menu?.find(
    food => food._id === item.menuItem
  )

  return {
    id: item.menuItem,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: menuItem?.image || "",
  }
})

        setCartItems(formattedItems)
      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error("Fetch cart error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Load cart when user logs in
  useEffect(() => {
    fetchCart()
  }, [user])

  // Add food to cart
  const addToCart = async (food) => {
    if (!user?.id) {
      alert("Please login to add items to cart.")
      return
    }

    try {
      const result = await api.post("/cart", {
        userId: user.id,
        menuItemId: food.id,
        quantity: 1,
      })

      if (!result.success) {
        alert(result.message || "Failed to add item to cart")
        return
      }

      await fetchCart()

      alert("Item added to cart!")
    } catch (error) {
      console.error("Add to cart error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  // Remove food from cart
  const removeFromCart = async (foodId) => {
    if (!user?.id) {
      return
    }

    try {
      const result = await api.delete(
        `/cart/${foodId}`,
        {
          userId: user.id,
        }
      )

      if (!result.success) {
        alert(result.message || "Failed to remove item")
        return
      }

      await fetchCart()
    } catch (error) {
      console.error("Remove from cart error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  // Update quantity
  const updateQuantity = async (foodId, quantity) => {
    if (!user?.id) {
      return
    }

    if (quantity < 1) {
      await removeFromCart(foodId)
      return
    }

    try {
      const result = await api.put(
        `/cart/${foodId}`,
        {
          userId: user.id,
          quantity: quantity,
        }
      )

      if (!result.success) {
        alert(result.message || "Failed to update quantity")
        return
      }

      await fetchCart()
    } catch (error) {
      console.error("Update quantity error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  // Clear cart
  const clearCart = async () => {
    if (!user?.id) {
      setCartItems([])
      return
    }

    try {
      for (const item of cartItems) {
        await api.delete(
          `/cart/${item.id}`,
          {
            userId: user.id,
          }
        )
      }

      setCartItems([])
    } catch (error) {
      console.error("Clear cart error:", error)
      alert("Unable to clear cart.")
    }
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

export default CartProvider