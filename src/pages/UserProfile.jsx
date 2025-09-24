import { useContext, useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import ProductContext from "../ProductContext";

export function UserProfile() {
  const { address } = useContext(ProductContext);
  console.log(address)

  return (
    <>
      <Header />
      {
        address.length > 0 ? address.map(address => (

          <div
            className="container-fluid py-4 pages-bg"
            style={{ backgroundColor: "#F8F5E9", minHeight: "100vh" }}
          >
            <div className="container">
              <div className="row">
                {/* Profile Header */}
                <div className="col-12 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body text-center py-5 pages-bg">
                      <div className="mb-3">
                        <img
                          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
                          alt="Profile"
                          className="rounded-2 border border-1 border-primary"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <h2 className="card-title mb-1">
                        {address.name}
                      </h2>
                      <p className="text-muted mb-3">{address.email}</p>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="col-lg-12 mb-4">
                  {/* Personal Information */}
                  <div className="card shadow-sm mb-4">
                    <div className="card-header bg-white">
                      <h5 className="card-title user-text-center fs-3 text-primary">
                        <i className="bi bi-person me-2"></i>
                        Personal Information
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fs-5 fw-semibold">
                            Name:
                          </label>
                            <span className="mx-2 fs-5">
                              {address.name}
                            </span>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fs-5 fw-semibold">
                            Email
                          </label>
                            <span className="mx-2 fs-5">
                              {address.email}
                            </span>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fs-5 fw-semibold">
                            Phone
                          </label>
                            <span className="mx-2 fs-5">
                              {address.phone}
                            </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="card shadow-sm mb-4">
                    <div className="card-header bg-white">
                      <h5 className="card-title user-text-center fs-3 text-primary">
                        <i className="bi bi-geo-alt me-2"></i>
                        Address Information
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fs-5 fw-semibold">
                            Street Address
                          </label>
                          <span className="mx-2 fs-5">
                              {address.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        )) : 

        (<div className="container text-center">
          <img src='/img3.png' className='img-fluid py-4 w-50' />
        </div>
        )
      }
      <Footer />
    </>
  );
}
