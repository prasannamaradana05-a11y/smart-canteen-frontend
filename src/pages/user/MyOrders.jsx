import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { api } from "../../services/api"

function MyOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    if (!user?.id) {
      setOrders([])
      setLoading(false)
      return
    }

    try {
      const result = await api.get(`/orders/user/${user.id}`)

      if (result.success) {
        setOrders(result.orders || [])
      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error("Fetch orders error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [user])

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    )

    if (!confirmCancel) {
      return
    }

    try {
      const result = await api.put(`/orders/${orderId}/cancel`)

      if (!result.success) {
        alert(result.message || "Unable to cancel order")
        return
      }

      alert("Order cancelled successfully!")

      fetchOrders()
    } catch (error) {
      console.error("Cancel order error:", error)
      alert("Unable to connect to the backend.")
    }
  }

  if (loading) {
    return (
      <div className="my-orders-page">
        <div className="admin-header">
          <h1>My Orders</h1>
          <p>Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-orders-page">

      <div className="admin-header">
        <h1>My Orders</h1>
        <p>View and track your Smart Canteen orders</p>
      </div>

      <div className="my-orders-list">

        {orders.length === 0 ? (

          <div className="empty-orders">
            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet.
            </p>

            <Link
              to="/menu"
              className="admin-btn"
            >
              Browse Menu
            </Link>
          </div>

        ) : (

          orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              <div className="order-card-header">

                <div>
                  <h2>
                    {order._id}
                  </h2>

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

                <span className="order-status">
                  {order.status}
                </span>

              </div>
              <div className="order-card-body">

  <p>
    <strong>Token ID:</strong>{" "}
    {order.tokenId}
  </p>

  <p>
    <strong>Items:</strong>{" "}

    {order.items.map((item, index) => (
      <span key={index}>
        {item.name} × {item.quantity}

        {index < order.items.length - 1
          ? ", "
          : ""}
      </span>
    ))}
  </p>

  <p>
    <strong>Total:</strong>{" "}
    ₹{order.totalAmount}
  </p>

</div>

             

              <div className="order-card-actions">

                <Link
                  to={`/orders/${order._id}`}
                  state={{ order }}
                  className="admin-btn"
                >
                  Track Order
                </Link>

                {order.status === "Placed" && (
                  <button
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "10px 16px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      marginLeft: "10px"
                    }}
                    onClick={() =>
                      handleCancelOrder(order._id)
                    }
                  >
                    Cancel Order
                  </button>
                )}

                {order.status === "Completed" && (
                  <Link
                    to="/feedback"
                    state={{ order }}
                    className="feedback-btn primary-feedback-btn"
                  >
                    Give Feedback
                  </Link>
                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default MyOrders