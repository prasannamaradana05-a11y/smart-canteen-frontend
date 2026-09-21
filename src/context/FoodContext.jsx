import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

const FoodContext = createContext()

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)

  // Get menu from backend / MongoDB Atlas
  const fetchFoods = async () => {
    try {
      const result = await api.get("/menu")

      if (result.success) {
        const formattedFoods = result.menu.map((food) => ({
          id: food._id,
          name: food.name,
          category: food.category,
          price: food.price,
          description: food.description,
          image: food.image,
          available: food.available,
          rating: food.rating,
        }))

        setFoods(formattedFoods)
      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error("Failed to load menu:", error)
    } finally {
      setLoading(false)
    }
  }

  // Load menu when application starts
  useEffect(() => {
    fetchFoods()
  }, [])

  // Add new food
  const addFood = async (food) => {
    try {
      const result = await api.post("/admin/menu", {
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category,
        rating: food.rating || 0,
        available: true,
        image: food.image || "",
      })

      if (!result.success) {
        alert(result.message || "Failed to add food")
        return
      }

      const newFood = {
        id: result.menuItem._id,
        name: result.menuItem.name,
        category: result.menuItem.category,
        price: result.menuItem.price,
        description: result.menuItem.description,
        image: result.menuItem.image,
        available: result.menuItem.available,
        rating: result.menuItem.rating,
      }

      setFoods((currentFoods) => [
        ...currentFoods,
        newFood,
      ])

      alert("Food added successfully!")
    } catch (error) {
      console.error("Add food error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  // Update food
  const updateFood = async (id, updatedFood) => {
    try {
      const result = await api.put(`/admin/menu/${id}`, {
        name: updatedFood.name,
        description: updatedFood.description,
        price: updatedFood.price,
        category: updatedFood.category,
        rating: updatedFood.rating || 0,
        available:
          updatedFood.available !== undefined
            ? updatedFood.available
            : true,
        image: updatedFood.image || "",
      })

      if (!result.success) {
        alert(result.message || "Failed to update food")
        return
      }

      const updatedItem = result.menuItem

      setFoods((currentFoods) =>
        currentFoods.map((food) =>
          food.id === id
            ? {
                id: updatedItem._id,
                name: updatedItem.name,
                category: updatedItem.category,
                price: updatedItem.price,
                description: updatedItem.description,
                image: updatedItem.image,
                available: updatedItem.available,
                rating: updatedItem.rating,
              }
            : food
        )
      )

      alert("Food updated successfully!")
    } catch (error) {
      console.error("Update food error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  // Delete food
  const deleteFood = async (id) => {
    try {
      const result = await api.delete(`/admin/menu/${id}`)

      if (!result.success) {
        alert(result.message || "Failed to delete food")
        return
      }

      setFoods((currentFoods) =>
        currentFoods.filter((food) => food.id !== id)
      )

      alert("Food deleted successfully!")
    } catch (error) {
      console.error("Delete food error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  // Toggle food availability
  const toggleAvailability = async (id) => {
    try {
      const food = foods.find((item) => item.id === id)

      if (!food) {
        return
      }

      const newAvailability = !food.available

      const result = await api.put(
        `/admin/menu/${id}/availability`,
        {
          available: newAvailability,
        }
      )

      if (!result.success) {
        alert(result.message || "Failed to update availability")
        return
      }

      setFoods((currentFoods) =>
        currentFoods.map((item) =>
          item.id === id
            ? {
                ...item,
                available: newAvailability,
              }
            : item
        )
      )
    } catch (error) {
      console.error("Toggle availability error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  return (
    <FoodContext.Provider
      value={{
        foods,
        loading,
        fetchFoods,
        addFood,
        updateFood,
        deleteFood,
        toggleAvailability,
      }}
    >
      {children}
    </FoodContext.Provider>
  )
}

export const useFood = () => useContext(FoodContext)

export default FoodProvider