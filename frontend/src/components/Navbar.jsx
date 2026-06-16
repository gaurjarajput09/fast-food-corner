import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top premium-navbar">
      <div className="container">

        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="navbar-logo-icon">🍔</span>
          <span className="navbar-brand-text">Fast Food <span className="navbar-brand-accent">Corner</span></span>
        </Link>

        <button
          className="navbar-toggler border-0"
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
              <Link className="nav-link nav-link-premium" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-link-premium" to="/menu">Menu</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-link-premium" to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-link-premium" to="/booking">📅 Book Table</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-link-premium" to="/contact">Contact</Link>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link nav-link-premium nav-cart-link position-relative" to="/cart">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="nav-cart-badge">
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