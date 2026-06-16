import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

// ===== Local Asset Imports =====
// Removed static asset imports; using fallback images for menu items
// The imageMap will be empty, getImage will return the fallback URL if no local image exists.
// Fallback Unsplash image
const FALLBACK = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop";

// Helper to get image URL for a menu item.
// The backend stores image filenames; they are served from /images.
// If the image field is empty or invalid, use the fallback Unsplash image.
const getImage = (key) => {
  if (!key) return FALLBACK;
  if (key.startsWith('http')) return key;
  return `${API_BASE_URL}/images/${key}`;
};

// ===== Cuisine Config =====
const cuisines = ["All", "Indian", "Chinese", "Italian", "Fast Food"];
const cuisineEmojis = {
  All: "🍽️",
  Indian: "🍛",
  Chinese: "🥡",
  Italian: "🍕",
  "Fast Food": "🍔",
};

const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {

  const fetchMenu = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE_URL}/api/menu`);

      console.log("MENU DATA:", res.data);

      setMenuItems(res.data);

      setError(null);

    } catch (err) {
      console.error(err);
      setError("Menu loading...");
    } finally {
      setLoading(false);
    }
  };

  fetchMenu();

}, []);

  const filtered =
    activeCuisine === "All"
      ? menuItems
      : menuItems.filter((item) => item.cuisine === activeCuisine);

  return (
    <div className="menu-page">
      {/* Hero Banner */}
      <div className="menu-hero">
        <div className="menu-hero-content">
          <h1>🍽️ Our Delicious Menu</h1>
          <p>Authentic flavours from around the world — crafted with love</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Cuisine Filter Tabs */}
        <div className="cuisine-tabs">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              className={`cuisine-tab ${activeCuisine === cuisine ? "active" : ""}`}
              onClick={() => setActiveCuisine(cuisine)}
            >
              {cuisineEmojis[cuisine]} {cuisine}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="menu-loading">
            <div className="spinner"></div>
            <p>Menu loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="menu-error">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* Menu Grid */}
        {!loading && !error && (
          <>
            <p className="menu-count">
              {filtered.length} items — <strong>{activeCuisine}</strong>
            </p>
            <div className="menu-grid">
              {filtered.map((item) => (
                <div key={item._id} className="menu-card-wrapper">
                  <div className="menu-card-new">
                    <div className="menu-img-wrapper">
                      <img
                        src={getImage(item.image)}
                        alt={item.name}
                        className="menu-img"
                        onError={(e) => { e.target.src = FALLBACK; }}
                      />
                      <span className={`veg-badge ${item.isVeg ? "veg" : "nonveg"}`}>
                        {item.isVeg ? "🟢 Veg" : "🔴 Non-Veg"}
                      </span>
                      <span className="cuisine-badge">
                        {cuisineEmojis[item.cuisine]} {item.cuisine}
                      </span>
                    </div>

                    <div className="menu-info">
                      <h5 className="menu-name">{item.name}</h5>
                      <p className="menu-desc">{item.description}</p>
                      <span className="menu-category-tag">{item.category}</span>

                      <div className="menu-footer">
                        <span className="menu-price">₹ {item.price}</span>
                        <button
                          className="add-cart-btn"
                          onClick={() => addToCart(item)}
                        >
                          🛒 Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="menu-empty">
                <p>😕 Is cuisine mein koi item nahi mila</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;