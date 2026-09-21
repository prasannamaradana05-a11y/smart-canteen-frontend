import { useFood } from "../../context/FoodContext"
import { useNavigate } from "react-router-dom"

function ManageFood() {
  const navigate = useNavigate()

  const {
    foods,
    deleteFood,
    toggleAvailability,
  } = useFood()

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    )

    if (confirmDelete) {
      deleteFood(id)
    }
  }

  return (
    <div className="manage-food-page">

      <div className="admin-header">
        <h1>Manage Food</h1>
        <p>Add, edit and manage canteen food items</p>
      </div>

      <div className="food-management-header">

        <h2>Food Items</h2>

        <button
          className="admin-btn"
          onClick={() => navigate("/admin/food/add")}
        >
          + Add Food
        </button>

      </div>

      <div className="admin-food-list">

        {foods.map((food) => (

          <div
            className="admin-food-card"
            key={food.id}
          >

            <div>

              <h3>{food.name}</h3>

              <p>
                Category: {food.category}
              </p>

              <strong>
                ₹{food.price}
              </strong>

              <p>
                Status:{" "}
                {food.available
                  ? "Available"
                  : "Unavailable"}
              </p>

            </div>

            <div className="admin-food-actions">

              <button
                className="edit-btn"
                onClick={() =>
                  navigate(
                    `/admin/food/edit/${food.id}`
                  )
                }
              >
                Edit
              </button>

              <button
                className="availability-btn"
                onClick={() =>
                  toggleAvailability(food.id)
                }
              >
                {food.available
                  ? "Mark Unavailable"
                  : "Mark Available"}
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(food.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default ManageFood