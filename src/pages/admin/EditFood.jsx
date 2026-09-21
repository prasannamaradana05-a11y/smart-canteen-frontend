import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFood } from "../../context/FoodContext"

function EditFood() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { foods, updateFood } = useFood()

  // MongoDB _id is a string
  const food = foods.find(
    (item) => item.id === id
  )

  const [name, setName] = useState(food?.name || "")
  const [category, setCategory] = useState(
    food?.category || "Tiffins"
  )
  const [price, setPrice] = useState(
    food?.price || ""
  )
  const [description, setDescription] = useState(
    food?.description || ""
  )

  if (!food) {
    return (
      <div className="food-details-page">

        <h2>Food item not found</h2>

        <button
          className="admin-btn"
          onClick={() => navigate("/admin/food")}
        >
          Back to Manage Food
        </button>

      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedFood = {
      name,
      category,
      price: Number(price),
      description,
      rating: food.rating || 0,
      available: food.available,
      image: food.image || "",
    }

    await updateFood(food.id, updatedFood)

    navigate("/admin/food")
  }

  return (
    <div className="add-food-page">

      <div className="admin-header">
        <h1>Edit Food</h1>

        <p>
          Update the food item details
        </p>
      </div>

      <div className="add-food-card">

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Food Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="Tiffins">
                Tiffins
              </option>

              <option value="Lunch">
                Lunch
              </option>

              <option value="Fast Food">
                Fast Food
              </option>

              <option value="Drinks">
                Drinks
              </option>
            </select>

          </div>

          <div className="form-group">

            <label>
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              min="1"
              required
            />

          </div>

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="4"
              required
            />

          </div>

          <div className="add-food-actions">

            <button
              type="submit"
              className="auth-btn"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="back-cart-btn"
              onClick={() =>
                navigate("/admin/food")
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default EditFood