import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFood } from "../../context/FoodContext"

function AddFood() {
  const navigate = useNavigate()
  const { addFood } = useFood()

  const [name, setName] = useState("")
  const [category, setCategory] = useState("Tiffins")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const newFood = {
      name,
      category,
      price: Number(price),
      description,
    }

    addFood(newFood)

    alert("Food item added successfully!")

    navigate("/admin/food")
  }

  return (
    <div className="add-food-page">

      <div className="admin-header">
        <h1>Add Food</h1>
        <p>Add a new food item to the canteen menu</p>
      </div>

      <div className="add-food-card">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Food Name</label>

            <input
              type="text"
              placeholder="Enter food name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Tiffins">Tiffins</option>
              <option value="Lunch">Lunch</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              placeholder="Enter food description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          <div className="add-food-actions">

            <button
              type="submit"
              className="auth-btn"
            >
              Add Food
            </button>

            <button
              type="button"
              className="back-cart-btn"
              onClick={() => navigate("/admin/food")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default AddFood