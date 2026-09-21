import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFood } from "../../context/FoodContext"
import { useCart } from "../../context/CartContext"

function Menu() {
  const [addedFood, setAddedFood] = useState("")

  const navigate = useNavigate()
  const { foods } = useFood()
  const { addToCart } = useCart()

  const [search, setSearch] = useState("")

  const categories = [
    "Tiffins",
    "Lunch",
    "Fast Food",
    "Drinks",
  ]

  const getFoodsByCategory = (category) => {
    return foods.filter((food) => {
      const matchesCategory = food.category === category

      const matchesSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }

  const handleAddToCart = (food) => {
    addToCart(food)
    setAddedFood(food.name)

    setTimeout(() => {
      setAddedFood("")
    }, 2000)
  }

  return (
    <div className="menu-page">

      {/* Header */}
      <div className="menu-header">
        <h1>Our Menu</h1>

        <p>
          Choose your favorite food from our canteen
        </p>
      </div>

      {/* Search */}
      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="menu-search"
        />
      </div>

      {/* Add to Cart Success Message */}
      {addedFood && (
        <div className="cart-success-message">
          <span>✓ {addedFood} added to cart</span>

          <Link to="/cart">
            Go to Cart
          </Link>
        </div>
      )}

      {/* Food Categories */}
      {categories.map((category) => {
        const categoryFoods = getFoodsByCategory(category)

        return (
          <section
            className="menu-category-section"
            key={category}
          >
            <h2 className="menu-category-title">
              {category}
            </h2>

            {categoryFoods.length > 0 ? (
              <div className="food-grid">

                {categoryFoods.map((food) => (
                  <div
                    className="food-card"
                    key={food.id}
                  >

                    <img
                      src={
                        food.image ||
                        "/images/masala-dosa.jpg"
                      }
                      alt={food.name}
                      className="food-image"
                      onClick={() =>
                        navigate(
                          `/food/${food.id}`,
                          {
                            state: { food },
                          }
                        )
                      }
                    />

                    <div className="food-info">

                      <h3>{food.name}</h3>

                      <p>
                        {food.description}
                      </p>

                      <div className="food-bottom">

                        <strong>
                          ₹{food.price}
                        </strong>

                        <button
                          className="add-cart-btn"
                          disabled={!food.available}
                          onClick={() =>
                            handleAddToCart(food)
                          }
                        >
                          {food.available
                            ? "Add to Cart"
                            : "Unavailable"}
                        </button>

                      </div>

                    </div>
                  </div>
                ))}

              </div>
            ) : (
              <p className="no-food">
                No {category.toLowerCase()} found.
              </p>
            )}
          </section>
        )
      })}

    </div>
  )
}

export default Menu