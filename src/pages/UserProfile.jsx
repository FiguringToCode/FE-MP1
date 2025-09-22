import { useState } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving user info:", userInfo)
  }

  return (
    <>
    <Header />
    <div className="container-fluid py-4 pages-bg" style={{ backgroundColor: "#F8F5E9", minHeight: "100vh" }}>
      <div className="container">
        <div className="row">
          {/* Profile Header */}
          <div className="col-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center py-5">
                <div className="mb-3">
                  <img
                    src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
                    alt="Profile"
                    className="rounded-2 border border-1 border-primary"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                </div>
                <h2 className="card-title mb-1">
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <p className="text-muted mb-3">{userInfo.email}</p>
                <button className="btn btn-outline-primary me-2">
                  <i className="bi bi-camera me-1"></i>
                  Change Photo
                </button>
                <button className="btn btn-primary" onClick={() => setIsEditing(!isEditing)}>
                  <i className="bi bi-pencil me-1"></i>
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-12 mb-4">
            {/* Personal Information */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0">
                  <i className="bi bi-person me-2"></i>
                  Personal Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{userInfo.firstName}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{userInfo.lastName}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{userInfo.email}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{userInfo.phone}</p>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-3">
                    <button className="btn btn-success me-2" onClick={handleSave}>
                      <i className="bi bi-check-lg me-1"></i>
                      Save Changes
                    </button>
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0">
                  <i className="bi bi-geo-alt me-2"></i>
                  Address Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Street Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{userInfo.address}</p>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">City</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={userInfo.city}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{userInfo.city}</p>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={userInfo.state}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{userInfo.state}</p>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">ZIP Code</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="zipCode"
                        value={userInfo.zipCode}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{userInfo.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
