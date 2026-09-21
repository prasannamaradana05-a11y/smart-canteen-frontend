import { Link, useLocation, useParams } from "react-router-dom"

function AdminOrderDetails() {
  const { id } = useParams()
  const location = useLocation()

  // Get the actual order from Manage Orders
  const order = location.state?.order

  if (!order) {
    return (
      <div className="admin-order-details-page">

        <div className="admin-header">
          <h1>Order Details</h1>
          <p>Order information could not be loaded.</p>
        </div>

        <Link
          to="/admin/orders"
          className="admin-btn"
        >
          ← Back to Orders
        </Link>

      </div>
    )
  }

  return (
    <div className="admin-order-details-page">

      <div className="admin-header">
        <h1>Order Details</h1>
        <p>View complete customer order information</p>
      </div>

      <div className="admin-order-details-card">

        <div className="order-details-top">

          <div>
            <h2>{order.id}</h2>
            <p>{order.date}</p>
          </div>

          <span className="order-status">
            {order.status}
          </span>

        </div>

        <hr />

        <div className="customer-details">

          <h3>Customer Information</h3>

          <p>
            <strong>Name:</strong>{" "}
            {order.customer || "User"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {order.email || "user@example.com"}
          </p>

        </div>

        <hr />

        <div className="order-items-details">

          <h3>Ordered Items</h3>

          {order.items.map((item, index) => (

            <div
              className="admin-order-item"
              key={item.id || index}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>

          ))}

        </div>

        <hr />

        <div className="order-total-details">

          <p>
            <strong>Total Amount</strong>
          </p>

          <h2>₹{order.total}</h2>

        </div>

        <div className="payment-status">

          <strong>Payment:</strong>{" "}

          {order.paymentStatus || "Pending"}

        </div>

        <Link
          to="/admin/orders"
          className="admin-btn"
        >
          ← Back to Orders
        </Link>

      </div>

    </div>
  )
}

export default AdminOrderDetails