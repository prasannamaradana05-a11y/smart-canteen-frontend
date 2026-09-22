import { Link, useLocation } from "react-router-dom"

function OrderSuccess() {
  const location = useLocation()

  const order = location.state?.order

  return (
    <div className="order-success-page">

      <div className="order-success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Your order has been placed successfully.
        </p>

        {order && (
          <div className="success-order-details">

            <p>
              <strong>Token ID:</strong>{" "}
              {order.tokenId}
            </p>

            <p>
              <strong>Order ID:</strong>{" "}
              {order._id}
            </p>

            <p>
              <strong>Total Amount:</strong>{" "}
              ₹{order.totalAmount}
            </p>

            <p>
              <strong>Payment Method:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>Payment Status:</strong>{" "}
              {order.paymentStatus}
            </p>

            <p>
              <strong>Order Status:</strong>{" "}
              {order.status}
            </p>

          </div>
        )}

        <p className="success-submessage">
          You can track your order from My Orders.
        </p>

        <div className="success-actions">

          <Link
            to="/orders"
            className="success-btn primary-success-btn"
          >
            View My Orders
          </Link>

          <Link
            to="/menu"
            className="success-btn secondary-success-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  )
}

export default OrderSuccess