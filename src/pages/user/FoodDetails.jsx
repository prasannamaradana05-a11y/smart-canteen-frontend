import { Link, useLocation } from "react-router-dom"
import { useCart } from "../../context/CartContext"

function FoodDetails() {
  const location = useLocation()
  const { addToCart } = useCart()

  const food = location.state?.food

  if (!food) {
    return (
      <div className="food-details-page">
        <h2>Food not found</h2>
        <Link to="/menu">Back to Menu</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(food)
    alert(`${food.name} added to cart!`)
  }

  return (
    <div className="food-details-page">

      <div className="food-details-card">

        <img
          src={food.image}
          alt={food.name}
          className="food-details-image"
        />

        <div className="food-details-info">

          <h1>{food.name}</h1>

          <p>{food.description}</p>

          <div className="food-details-price">
            ₹{food.price}
          </div>

          <div className="food-details-rating">
            ⭐ {food.rating || "4.5"}
          </div>

          <p>
            {food.available ? "Available" : "Currently unavailable"}
          </p>

          <button
            className="add-cart-btn"
            disabled={!food.available}
            onClick={handleAddToCart}
          >
            {food.available ? "Add to Cart" : "Unavailable"}
          </button>

          <br />
          <br />

          <Link to="/menu">
            ← Back to Menu
          </Link>

        </div>

      </div>

    </div>
  )
}

export default FoodDetails