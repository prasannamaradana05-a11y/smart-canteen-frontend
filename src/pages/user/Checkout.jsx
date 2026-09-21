import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { api } from "../../services/api"
import { useState } from "react"

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState("")

  // UPI payment states
  const [showUpiPayment, setShowUpiPayment] = useState(false)
  const [upiId, setUpiId] = useState("")
  const [processingPayment, setProcessingPayment] = useState(false)

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder = async () => {
    if (!user?.id) {
      alert("Please login before placing an order.")
      navigate("/login")
      return
    }

    if (!paymentMethod) {
      alert("Please select a payment method.")
      return
    }

    // If UPI is selected, show UPI payment screen first
    if (paymentMethod === "UPI") {
      setShowUpiPayment(true)
      return
    }

    // =====================================================
    // CASH PAYMENT
    // =====================================================

    try {
      const result = await api.post("/orders", {
        userId: user.id,
        paymentMethod: "Cash",
      })

      if (!result.success) {
        alert(result.message || "Failed to place order")
        return
      }

      await clearCart()

      alert("Order placed successfully!")

      navigate("/order-success", {
        state: {
          order: result.order,
        },
      })
    } catch (error) {
      console.error("Place order error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  // =====================================================
  // UPI PAYMENT
  // =====================================================

  const handleUpiPayment = async () => {
    if (!upiId.trim()) {
      alert("Please enter your UPI ID.")
      return
    }

    setProcessingPayment(true)

    try {
      // -------------------------------------------------
      // Step 1: Create Order
      // -------------------------------------------------

      const orderResult = await api.post("/orders", {
        userId: user.id,
        paymentMethod: "UPI",
      })

      if (!orderResult.success) {
        alert(orderResult.message || "Failed to create order")
        return
      }

      const order = orderResult.order

      // -------------------------------------------------
      // Step 2: API 24 - Create Payment
      // -------------------------------------------------

      const paymentResult = await api.post("/payment/create", {
        orderId: order._id,
        amount: order.totalAmount,
        paymentMethod: "UPI",
      })

      if (!paymentResult.success) {
        alert(paymentResult.message || "Payment creation failed")
        return
      }

      const payment = paymentResult.payment

      // -------------------------------------------------
      // Step 3: API 25 - Verify Payment
      // -------------------------------------------------

      const verifyResult = await api.post("/payment/verify", {
        paymentId: payment.paymentId,
        orderId: order._id,
        paymentStatus: "Paid",
      })

      if (!verifyResult.success) {
        alert(verifyResult.message || "Payment verification failed")
        return
      }

      // -------------------------------------------------
      // Step 4: Payment Successful
      // -------------------------------------------------

      order.paymentStatus = "Paid"

      await clearCart()

      setShowUpiPayment(false)

      alert("UPI payment successful!")

      navigate("/order-success", {
        state: {
          order: order,
        },
      })
    } catch (error) {
      console.error("UPI payment error:", error)
      alert("Unable to process UPI payment.")
    } finally {
      setProcessingPayment(false)
    }
  }

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <h1>No Items to Checkout</h1>
        <p>Your cart is empty.</p>

        <Link to="/menu" className="menu-btn">
          Browse Menu
        </Link>
      </div>
    )
  }

  // =====================================================
  // FRONTEND
  // =====================================================

  return (
    <div className="checkout-page">

      {/* =================================================
          UPI PAYMENT SCREEN
      ================================================= */}

      {showUpiPayment && (
        <div className="upi-payment-overlay">
          <div className="upi-payment-box">

            <h2>UPI Payment</h2>

            <p className="upi-payment-subtitle">
              Complete your payment to place the order
            </p>

            <div className="upi-amount">
              <span>Amount to Pay</span>
              <strong>₹{cartTotal}</strong>
            </div>

            <label>UPI ID</label>

            <input
              type="text"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />

            <p className="upi-demo-note">
              Demo payment — no real money will be charged.
            </p>

            <button
              className="upi-pay-btn"
              onClick={handleUpiPayment}
              disabled={processingPayment}
            >
              {processingPayment
                ? "Processing Payment..."
                : `Pay ₹${cartTotal}`}
            </button>

            <button
              className="upi-cancel-btn"
              onClick={() => setShowUpiPayment(false)}
              disabled={processingPayment}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* =================================================
          CHECKOUT HEADER
      ================================================= */}

      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Review your order and place it</p>
      </div>

      {/* =================================================
          CHECKOUT CONTENT
      ================================================= */}

      <div className="checkout-content">

        {/* ORDER ITEMS */}

        <div className="checkout-items">
          <h2>Order Items</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>

              <img
                src={item.image}
                alt={item.name}
                className="checkout-item-image"
              />

              <div className="checkout-item-info">
                <h3>{item.name}</h3>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="summary-row total-row">
            <span>Total Amount</span>
            <span>₹{cartTotal}</span>
          </div>

          {/* PAYMENT METHOD */}

          <div className="payment-section">

            <h3>Payment Method</h3>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash"
                checked={paymentMethod === "Cash"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              Cash / Pay at Counter
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              Online / UPI
            </label>

          </div>

          {/* PLACE ORDER */}

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

          {/* BACK TO CART */}

          <Link
            to="/cart"
            className="back-cart-btn"
          >
            ← Back to Cart
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Checkout