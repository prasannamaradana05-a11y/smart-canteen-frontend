import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ManageOrders() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // Load orders from backend
  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/orders"
      )

      const data = await response.json()

      console.log("Admin orders:", data)

      if (data.success) {
        setOrders(data.orders)
      } else {
        alert(data.message || "Failed to load orders")
      }
    } catch (error) {
      console.error("Error loading orders:", error)
      alert("Could not connect to backend")
    } finally {
      setLoading(false)
    }
  }

  // Update order status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      )

      const data = await response.json()

      console.log("Update status response:", data)

      if (data.success) {
        // Update the order on screen
        setOrders((previousOrders) =>
          previousOrders.map((order) =>
            order._id === id
              ? {
                  ...order,
                  status: newStatus
                }
              : order
          )
        )
      } else {
        alert(data.message || "Failed to update order")
      }
    } catch (error) {
      console.error("Error updating order:", error)
      alert("Could not connect to backend")
    }
  }

  // Loading screen
  if (loading) {
    return (
      <div className="admin-orders-page">

        <div className="admin-header">
          <h1>Manage Orders</h1>
          <p>Loading orders...</p>
        </div>

      </div>
    )
  }

  return (
    <div className="admin-orders-page">

      {/* Header */}
      <div className="admin-header">

        <h1>Manage Orders</h1>

        <p>
          View customer orders and update their status
        </p>

      </div>


      {/* Orders List */}
      <div className="admin-orders-list">

        {orders.length === 0 ? (

          <div className="empty-orders">

            <h2>No Orders Yet</h2>

            <p>
              No customer orders have been placed yet.
            </p>

          </div>

        ) : (

          orders.map((order) => (

            <div
              className="admin-order-card"
              key={order._id}
            >

              {/* Order Header */}
              <div className="admin-order-header">

                <div>

                  <h2>
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p>
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>

                  <p>
                    <strong>Customer:</strong>{" "}
                    {order.user?.name || "Unknown"}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {order.user?.email || "Unknown"}
                  </p>

                </div>


                {/* Status */}
                <span
                  className={`admin-order-status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>

              </div>


              {/* Order Body */}
              <div className="admin-order-body">

                {/* Items */}
                <p>

                  <strong>Items:</strong>{" "}

                  {order.items.map(
                    (item, index) => (

                      <span
                        key={item._id}
                      >

                        {item.name} ×{" "}
                        {item.quantity}

                        {index <
                        order.items.length - 1
                          ? ", "
                          : ""}

                      </span>

                    )
                  )}

                </p>


                {/* Total */}
                <p>

                  <strong>Total:</strong>{" "}

                  ₹{order.totalAmount}

                </p>


                {/* Payment Method */}
                <p>

                  <strong>
                    Payment:
                  </strong>{" "}

                  {order.paymentMethod}

                </p>


                {/* Payment Status */}
                <p>

                  <strong>
                    Payment Status:
                  </strong>{" "}

                  {order.paymentStatus}

                </p>

              </div>


              {/* Actions */}
              <div className="admin-order-actions">

                <label>
                  Update Status
                </label>


                <select
                  value={order.status}
                  disabled={
                    order.status ===
                      "Completed" ||
                    order.status ===
                      "Cancelled"
                  }
                  onChange={(event) =>
                    updateStatus(
                      order._id,
                      event.target.value
                    )
                  }
                >

                  <option value="Placed">
                    Placed
                  </option>

                  <option value="Preparing">
                    Preparing
                  </option>

                  <option value="Ready">
                    Ready
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>


                {/* View Details */}
                <button
                  className="admin-btn"
                  onClick={() =>
                    navigate(
                      `/admin/orders/${order._id}`,
                      {
                        state: {
                          order: order
                        }
                      }
                    )
                  }
                >
                  View Details
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default ManageOrders