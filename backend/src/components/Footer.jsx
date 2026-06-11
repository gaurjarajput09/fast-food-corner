function Footer() {
  return (
    <footer className="footer-section text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Restaurant Info */}
          <div className="col-md-4 mb-4">
            <h3 className="text-warning">Fast Food Corner</h3>
            <p>
              Authentic Indian, Chinese & Italian Cuisine.
              Fresh ingredients, great taste and excellent service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h4>Quick Links</h4>

            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/menu" className="footer-link">Menu</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h4>Contact Us</h4>

            <p>📍 Panna, Madhya Pradesh</p>
            <p>📞 +91 6265935663</p>
            <p>✉ info@fastfoodcorner.com</p>
          </div>

        </div>

        <hr />

        <div className="text-center">
          <p>
            © 2026 Fast Food Corner. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;