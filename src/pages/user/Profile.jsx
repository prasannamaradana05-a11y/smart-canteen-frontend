import { useAuth } from "../../context/AuthContext"

function Profile() {
  const { user } = useAuth()

  return (
    <div className="profile-page">

      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your Smart Canteen account</p>
      </div>

      <div className="profile-card">

        <div className="profile-top">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="profile-welcome">
            <h2>{user?.name || "User"}</h2>
            <p>Smart Canteen User</p>
          </div>

        </div>

        <div className="profile-divider"></div>

        <h3 className="profile-section-title">
          Personal Information
        </h3>

        <div className="profile-info">

          <div className="profile-field">
            <div>
              <span>Name</span>
              <strong>{user?.name || "User"}</strong>
            </div>
          </div>

          <div className="profile-field">
            <div>
              <span>Email Address</span>
              <strong>{user?.email || "Not available"}</strong>
            </div>
          </div>

          <div className="profile-field">
            <div>
              <span>Account Type</span>
              <strong>User</strong>
            </div>

            <span className="account-badge">
              Active
            </span>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Profile