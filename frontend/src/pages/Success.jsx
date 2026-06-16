import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Success = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="success-page">
      <div className={`success-card ${show ? "success-visible" : ""}`}>
        <div className="success-check-circle">
          <svg className="success-checkmark" viewBox="0 0 52 52">
            <circle className="success-check-bg" cx="26" cy="26" r="25" fill="none" />
            <path className="success-check-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        
        <h1 className="success-title">Order Placed! 🎉</h1>
        <p className="success-subtitle">
          Thank you for your order! Your food is being prepared with love by our expert chefs.
        </p>

        <div className="success-info-row">
          <div className="success-info-item">
            <span className="success-info-icon">⏱️</span>
            <div>
              <strong>Estimated Time</strong>
              <p>30-45 minutes</p>
            </div>
          </div>
          <div className="success-info-item">
            <span className="success-info-icon">📞</span>
            <div>
              <strong>Need Help?</strong>
              <p>+91 6265935663</p>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/" className="success-btn success-btn-primary">
            🏠 Back to Home
          </Link>
          <Link to="/menu" className="success-btn success-btn-secondary">
            🍔 Order More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;