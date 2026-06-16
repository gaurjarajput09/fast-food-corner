import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const Order = ({ cartItems = [], total = 0 }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, phone, address } = form;
    const orderId = "ORD" + Date.now();

    const itemsText = cartItems
      .map((item) => `🍔 ${item.name} x ${item.qty || 1}`)
      .join("\n");

    const orderData = {
      orderId,
      name,
      phone,
      address,
      items: cartItems,
      totalPrice: total,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/orders/place`, orderData);

      const message = `
🧾 NEW ORDER RECEIVED

🆔 Order ID: ${orderId}

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

🛒 Items:
${itemsText}

💰 Total: ₹${total}

🕒 Time: ${new Date().toLocaleString()}
`;

      const whatsappNumber = "916265935663";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      navigate("/success");
    } catch (err) {
      alert("Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = form.name.trim() && form.phone.trim() && form.address.trim();

  return (
    <div className="order-page">
      <div className="order-hero">
        <div className="order-hero-content">
          <span className="order-hero-badge">📋 Checkout</span>
          <h1>Place Your Order</h1>
          <p>Almost there! Just fill in your delivery details.</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-60px", position: "relative", zIndex: 2, paddingBottom: "80px" }}>
        <div className="order-layout" data-aos="fade-up">
          {/* Left: Order Form */}
          <div className="order-form-panel">
            <div className="order-form-card">
              <div className="order-form-header">
                <div className="order-form-step">
                  <span className="step-number">1</span>
                  <div>
                    <h4>Delivery Information</h4>
                    <p>Where should we deliver your food?</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="order-input-group">
                  <label>
                    <span className="input-icon">👤</span>
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    placeholder="John Doe"
                    onChange={handleChange}
                    className="order-input"
                    required
                  />
                </div>

                <div className="order-input-group">
                  <label>
                    <span className="input-icon">📞</span>
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    placeholder="+91 98765 43210"
                    onChange={handleChange}
                    className="order-input"
                    required
                  />
                </div>

                <div className="order-input-group">
                  <label>
                    <span className="input-icon">📍</span>
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    placeholder="House no, Street, City, Pincode"
                    onChange={handleChange}
                    className="order-input order-textarea"
                    rows="3"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="order-submit-btn"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="order-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    "🛒 Confirm & Place Order"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="order-summary-panel">
            <div className="order-summary-card">
              <h4 className="order-summary-title">🧾 Order Summary</h4>

              {cartItems.length === 0 ? (
                <div className="order-empty">
                  <p>No items in order</p>
                </div>
              ) : (
                <>
                  <div className="order-items-list">
                    {cartItems.map((item) => (
                      <div className="order-item-row" key={item._id}>
                        <div className="order-item-info">
                          <span className="order-item-name">{item.name}</span>
                          <span className="order-item-qty">× {item.qty || 1}</span>
                        </div>
                        <span className="order-item-price">₹{item.price * (item.qty || 1)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-divider"></div>

                  <div className="order-total-section">
                    <div className="order-calc-row">
                      <span>Subtotal</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="order-calc-row">
                      <span>Delivery</span>
                      <span className="order-free-tag">FREE</span>
                    </div>
                    <div className="order-divider"></div>
                    <div className="order-calc-row order-grand-total">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="order-trust-badges">
              <div className="trust-badge">
                <span>🔒</span>
                <p>Secure Payment</p>
              </div>
              <div className="trust-badge">
                <span>⚡</span>
                <p>Fast Delivery</p>
              </div>
              <div className="trust-badge">
                <span>✅</span>
                <p>Quality Assured</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;