import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top shadow-lg">
      <div className="container">

        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold text-warning fs-4" to="/">
          🍔 Fast Food Corner
        </Link>

        <button
          className="navbar-toggler border-warning"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto align-items-center gap-1">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/menu">Menu</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            <li className="nav-item ms-lg-2">
              <Link className="nav-link btn btn-outline-warning text-warning px-3 rounded-pill fw-bold" style={{ borderWidth: "2px" }} to="/booking">📅 Book Table</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="badge bg-warning text-dark ms-1 rounded-pill">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {/* ✅ ORDER NOW CTA */}
            <li className="nav-item ms-2">
              <Link className="btn-order-now" to="/menu">
                🔥 Order Now
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;