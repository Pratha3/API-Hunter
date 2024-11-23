import React from "react";
import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";

function Navbar({ count }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fs-3" to="/">
          Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/form">
                Add Product
              </Link>
            </li>
          </ul>
          <Link
            className="nav-link d-flex align-items-center text-light"
            to="/Cart"
          >
            <IoCart fontSize={24} />
            <span className="badge bg-danger rounded-pill ms-2">{count}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
