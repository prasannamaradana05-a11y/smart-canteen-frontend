import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../services/api"

function OrderTracking() {
  const { id } = useParams()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchOrder = async () => {
    try {
      const result = await api.get(`/orders/${id}`)

      if (result.success) {
        setOrder(result.order)
      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error("Fetch order error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <div className="order-tracking-page">
        <div className="admin-header">
          <h1>Track Your Order</h1>
          <p>Loading order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="order-tracking-page">

        <div className="admin-header">
          <h1>Order Not Found</h1>
          <p>We could not find this order.</p>
        </div>

        <Link
          to="/orders"
          className="admin-btn"
        >
          ← Back to My Orders
        </Link>

      </div>
    )
  }

  const statuses = [
    "Placed",
    "Preparing",
    "Ready",
    "Completed",
  ]

  const currentIndex = statuses.indexOf(order.status)

  return (
    <div className="order-tracking-page">

      <div className="admin-header">
        <h1>Track Your Order</h1>
        <p>Order #{order._id}</p>
      </div>

      <div className="tracking-card">

        <div className="tracking-summary">

          <div>
            <h2>Order #{order._id}</h2>

            <p>
              {new Date(order.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <div>
            <strong>₹{order.totalAmount}</strong>
          </div>

        </div>

        <div className="tracking-progress">

          {statuses.map((status, index) => {

            const isCompleted =
              currentIndex >= 0 && index <= currentIndex

            const isCurrent =
              index === currentIndex

            return (
              <div
                className="tracking-step"
                key={status}
              >

                <div
                  className={
                    isCompleted
                      ? "tracking-circle active"
                      : "tracking-circle"
                  }
                >
                  {isCompleted ? "✓" : index + 1}
                </div>

                <div
                  className={
                    isCurrent
                      ? "tracking-label current"
                      : "tracking-label"
                  }
                >
                  {status}
                </div>

                {index < statuses.length - 1 && (
                  <div
                    className={
                      index < currentIndex
                        ? "tracking-line active"
                        : "tracking-line"
                    }
                  />
                )}

              </div>
            )
          })}

        </div>

        <div className="current-status">

          <h3>Current Status</h3>

          <p>
            Your order is currently{" "}
            <strong>{order.status}</strong>.
          </p>

        </div>

        <div className="tracking-payment-info">

          <p>
            <strong>Payment Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          <p>
            <strong>Payment Status:</strong>{" "}
            {order.paymentStatus}
          </p>

        </div>

        {order.status === "Completed" && (
          <div className="tracking-feedback-section">

            <p>
              Enjoyed your meal? We'd love to hear your feedback.
            </p>

            <Link
              to="/feedback"
              state={{ order: order }}
              className="feedback-btn primary-feedback-btn"
            >
              ⭐ Give Feedback
            </Link>

          </div>
        )}

        <Link
          to="/orders"
          className="admin-btn"
        >
          ← Back to My Orders
        </Link>

      </div>

    </div>
  )
}

export default OrderTracking