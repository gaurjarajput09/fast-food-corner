import React, { useState } from "react";
import { Link } from "react-router-dom";

// ===== Local Asset Imports for Food Items =====
import imgButterpaneer from "../assets/butterpaneer.webp";
import imgPaneerlababdar from "../assets/paneerlababdar.webp";
import imgPalakpaneer from "../assets/palakpaneer.avif";
import imgSahipaneer from "../assets/sahipaneer.webp";
import imgVegkofta from "../assets/vegkofta.webp";
import imgChholebhature from "../assets/chholebhature.webp";
import imgAaluParathe from "../assets/aalu parathe.webp";
import imgPlainparthe from "../assets/plainparthe.webp";
import imgNaan from "../assets/naan.webp";
import imgRoti from "../assets/roti.webp";
import imgAaluindian from "../assets/aaluindian.webp";
import imgGobhimasala from "../assets/gobhimasala.webp";
import imgPawbhaji from "../assets/pawbhaji.webp";
import imgSevtamatar from "../assets/sevtamatar.webp";
import imgOkra from "../assets/okra.webp";
import imgNoodlesChines from "../assets/noodles-chines.webp";
import imgTofuChines from "../assets/tofu-chines.webp";
import imgManchurianchines from "../assets/manchurianchines.webp";
import imgShexwannoodleschines from "../assets/shexwannoodleschines.webp";
import imgShezwanrice from "../assets/shezwan rice.webp";
import imgSpringrollchines from "../assets/springrollchines.webp";
import imgLasagnaitalian from "../assets/lasagnaitalian.webp";
import imgWhitesauceitalian from "../assets/whitesauceitalian.webp";
import imgMacroniitalian from "../assets/macroniitalian.avif";
import imgPizza from "../assets/pizza.webp";
import imgGarlicbreaditalian from "../assets/garlicbreaditalian.webp";
import imgPinkpastaitalian from "../assets/pinkpastaitalian.webp";
import imgRedsauceitalian from "../assets/redsauceitalian.webp";
import imgVegpizzaitalian from "../assets/vegpizzaitalian.webp";
import imgBurger from "../assets/burger.webp";
import imgFrenchfries from "../assets/frenchfries.webp";
import imgSandwhich from "../assets/sandwhich.webp";
import imgColdcoffee from "../assets/coldcoffee.webp";
import imgIcecream from "../assets/icecream.webp";

const FALLBACK = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop";

const imageMap = {
  butterpaneer: imgButterpaneer,
  paneerlababdar: imgPaneerlababdar,
  palakpaneer: imgPalakpaneer,
  sahipaneer: imgSahipaneer,
  vegkofta: imgVegkofta,
  chholebhature: imgChholebhature,
  aaluParathe: imgAaluParathe,
  plainparthe: imgPlainparthe,
  naan: imgNaan,
  roti: imgRoti,
  aaluindian: imgAaluindian,
  gobhimasala: imgGobhimasala,
  pawbhaji: imgPawbhaji,
  sevtamatar: imgSevtamatar,
  okra: imgOkra,
  noodlesChines: imgNoodlesChines,
  tofuChines: imgTofuChines,
  manchurianchines: imgManchurianchines,
  shexwannoodleschines: imgShexwannoodleschines,
  shezwanrice: imgShezwanrice,
  springrollchines: imgSpringrollchines,
  lasagnaitalian: imgLasagnaitalian,
  whitesauceitalian: imgWhitesauceitalian,
  macroniitalian: imgMacroniitalian,
  pizza: imgPizza,
  garlicbreaditalian: imgGarlicbreaditalian,
  pinkpastaitalian: imgPinkpastaitalian,
  redsauceitalian: imgRedsauceitalian,
  vegpizzaitalian: imgVegpizzaitalian,
  burger: imgBurger,
  frenchfries: imgFrenchfries,
  sandwhich: imgSandwhich,
  coldcoffee: imgColdcoffee,
  icecream: imgIcecream,
};

const getImage = (key) => imageMap[key] || key || FALLBACK;

const Cart = ({ cart, removeFromCart, setCart }) => {
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // 📲 WhatsApp Order
  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    const phoneNumber = "916265935663";
    const orderId = "ORD" + Date.now();
    const time = new Date().toLocaleString();

    const items = cart
      .map(
        (item) =>
          `🍔 ${item.name} x ${item.qty} = ₹${item.price * item.qty}`
      )
      .join("\n");

    const message = `
🍔 NEW ORDER

🆔 ${orderId}
👤 Name: ${customerName}
📞 Phone: ${customerPhone}
📍 Address: ${customerAddress}

${items}

💰 Total: ₹${getTotal()}

⏰ ${time}
    `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const isFormValid = customerName.trim() && customerPhone.trim() && customerAddress.trim();

  return (
    <div className="cart-page">
      {/* Hero Banner */}
      <div className="cart-hero">
        <div className="cart-hero-content">
          <span className="cart-hero-badge">🛒 Your Cart</span>
          <h1>Checkout</h1>
          <p>{cart.length} {cart.length === 1 ? "item" : "items"} in your cart</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-60px", position: "relative", zIndex: 2, paddingBottom: "80px" }}>
        {cart.length === 0 ? (
          <div className="cart-empty-state" data-aos="fade-up">
            <div className="cart-empty-icon">🛒</div>
            <h3>Your Cart is Empty</h3>
            <p>Looks like you haven't added anything yet. Explore our delicious menu!</p>
            <Link to="/menu" className="cart-browse-btn">
              🍔 Browse Menu
            </Link>
          </div>
        ) : (
          <div className="cart-layout" data-aos="fade-up">
            {/* Left: Cart Items */}
            <div className="cart-items-panel">
              <div className="cart-panel-header">
                <h3>🍽️ Order Items</h3>
                <span className="cart-item-count">{cart.length} items</span>
              </div>

              <div className="cart-items-list">
                {cart.map((item, index) => (
                  <div className="cart-item-card" key={item._id} style={{ animationDelay: `${index * 0.08}s` }}>
                    <div className="cart-item-img-wrap">
                      <img src={getImage(item.image)} alt={item.name} className="cart-item-img" />
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-top">
                        <div>
                          <h5 className="cart-item-name">{item.name}</h5>
                          <span className="cart-item-cuisine">{item.cuisine}</span>
                        </div>
                        <button className="cart-remove-btn" onClick={() => removeFromCart(item._id)} title="Remove">
                          ✕
                        </button>
                      </div>
                      <div className="cart-item-bottom">
                        <div className="cart-qty-controls">
                          <button className="cart-qty-btn" onClick={() => decreaseQty(item._id)}>−</button>
                          <span className="cart-qty-value">{item.qty}</span>
                          <button className="cart-qty-btn cart-qty-plus" onClick={() => increaseQty(item._id)}>+</button>
                        </div>
                        <span className="cart-item-price">₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Order Summary + Delivery Form */}
            <div className="cart-summary-panel">
              {/* Order Summary */}
              <div className="cart-summary-card">
                <h4 className="cart-summary-title">📋 Order Summary</h4>
                
                <div className="cart-summary-lines">
                  {cart.map((item) => (
                    <div className="cart-summary-line" key={item._id}>
                      <span>{item.name} × {item.qty}</span>
                      <span>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="cart-summary-divider"></div>

                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>₹{getTotal()}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Delivery</span>
                  <span className="cart-free-tag">FREE</span>
                </div>
                <div className="cart-summary-divider"></div>
                <div className="cart-summary-row cart-total-row">
                  <span>Total</span>
                  <span>₹{getTotal()}</span>
                </div>
              </div>

              {/* Delivery Form */}
              <div className="cart-delivery-card">
                <h4 className="cart-summary-title">📍 Delivery Details</h4>

                <div className="cart-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="cart-input"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="cart-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="cart-input"
                    placeholder="Enter phone number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>

                <div className="cart-form-group">
                  <label>Delivery Address</label>
                  <textarea
                    className="cart-input cart-textarea"
                    placeholder="Enter your full address"
                    rows="3"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>

                <button
                  className="cart-place-order-btn"
                  onClick={sendOrderToWhatsApp}
                  disabled={!isFormValid}
                >
                  {isFormValid ? "🛒 Place Order via WhatsApp" : "Fill details to order"}
                </button>

                {!isFormValid && (
                  <p className="cart-form-hint">Please fill all fields to continue</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;