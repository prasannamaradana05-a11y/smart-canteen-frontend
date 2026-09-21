import { Routes, Route } from "react-router-dom"

// User Pages
import Home from "../pages/user/Home"
import Menu from "../pages/user/Menu"
import Cart from "../pages/user/Cart"
import FoodDetails from "../pages/user/FoodDetails"
import Checkout from "../pages/user/Checkout"
import OrderSuccess from "../pages/user/OrderSuccess"
import MyOrders from "../pages/user/MyOrders"
import Login from "../pages/user/Login"
import Register from "../pages/user/Register"
import Feedback from "../pages/user/Feedback"
import Profile from "../pages/user/Profile"
import OrderTracking from "../pages/user/OrderTracking"

// User Protection
import ProtectedRoute from "../components/ProtectedRoute"

// Admin Pages
import AdminLogin from "../pages/admin/AdminLogin"
import Dashboard from "../pages/admin/Dashboard"
import ManageFood from "../pages/admin/ManageFood"
import ManageOrders from "../pages/admin/ManageOrders"
import AddFood from "../pages/admin/AddFood"
import EditFood from "../pages/admin/EditFood"
import AdminOrderDetails from "../pages/admin/AdminOrderDetails"
import AdminFeedback from "../pages/admin/Feedback"

// Admin Protection
import AdminProtectedRoute from "../components/AdminProtectedRoute"


function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          ADMIN ROUTES
      ========================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/food"
        element={
          <AdminProtectedRoute>
            <ManageFood />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/food/add"
        element={
          <AdminProtectedRoute>
            <AddFood />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/food/edit/:id"
        element={
          <AdminProtectedRoute>
            <EditFood />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <ManageOrders />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/orders/:id"
        element={
          <AdminProtectedRoute>
            <AdminOrderDetails />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/feedback"
        element={
          <AdminProtectedRoute>
            <AdminFeedback />
          </AdminProtectedRoute>
        }
      />


      {/* =========================
          USER PUBLIC ROUTES
      ========================= */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =========================
          USER PROTECTED ROUTES
      ========================= */}

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />

      <Route
        path="/food/:id"
        element={
          <ProtectedRoute>
            <FoodDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default AppRoutes