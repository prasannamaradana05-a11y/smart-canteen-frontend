import { useEffect, useState } from "react"
import { api } from "../../services/api"

function Dashboard() {
  const [menuCount, setMenuCount] = useState(0)
  const [availableFood, setAvailableFood] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const [pendingOrders, setPendingOrders] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const [menuResult, ordersResult] = await Promise.all([
        api.get("/menu"),
        api.get("/admin/orders"),
      ])

      // Menu data from MongoDB
      if (menuResult.success) {
        const menu = menuResult.menu || []

        setMenuCount(menu.length)

        setAvailableFood(
          menu.filter((food) => food.available).length
        )
      }

      // Orders data from MongoDB
      if (ordersResult.success) {
        const orders = ordersResult.orders || []

        setOrderCount(orders.length)

        setPendingOrders(
          orders.filter(
            (order) =>
              order.status === "Placed" ||
              order.status === "Preparing"
          ).length
        )
      }
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      )
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="admin-header">
          <h1>Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">

      <div className="admin-header">
        <h1>Dashboard</h1>

        <p>
          Overview of your smart canteen system
        </p>
      </div>

      <div className="dashboard-stats">

        {/* Total Food */}
        <div className="dashboard-card">
          <h3>Total Food Items</h3>

          <div className="dashboard-number">
            {menuCount}
          </div>

          <p>
            Items in menu
          </p>
        </div>

        {/* Available Food */}
        <div className="dashboard-card">
          <h3>Available Food</h3>

          <div className="dashboard-number">
            {availableFood}
          </div>

          <p>
            Currently available
          </p>
        </div>

        {/* Total Orders */}
        <div className="dashboard-card">
          <h3>Total Orders</h3>

          <div className="dashboard-number">
            {orderCount}
          </div>

          <p>
            Orders received
          </p>
        </div>

        {/* Active Orders */}
        <div className="dashboard-card">
          <h3>Active Orders</h3>

          <div className="dashboard-number">
            {pendingOrders}
          </div>

          <p>
            Placed or preparing
          </p>
        </div>

      </div>

      {/* Dashboard Information */}

      <div className="dashboard-section">

        <h2>
          System Overview
        </h2>

        <div className="dashboard-info">

          <p>
            <strong>
              Menu Items:
            </strong>{" "}
            {menuCount}
          </p>

          <p>
            <strong>
              Available Items:
            </strong>{" "}
            {availableFood}
          </p>

          <p>
            <strong>
              Total Orders:
            </strong>{" "}
            {orderCount}
          </p>

          <p>
            <strong>
              Active Orders:
            </strong>{" "}
            {pendingOrders}
          </p>

        </div>

      </div>

    </div>
  )
}

export default Dashboard