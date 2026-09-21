import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Your Cart is Empty</h1>
        <p>Add some delicious food from the menu.</p>

        <Link to="/menu" className="menu-btn">
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Review your items before checkout</p>
      </div>

      <div className="cart-content">

        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <h3>{item.name}</h3>

                <p>₹{item.price} each</p>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-right">
                <strong>
                  ₹{item.price * item.quantity}
                </strong>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Proceed to Checkout
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Cart