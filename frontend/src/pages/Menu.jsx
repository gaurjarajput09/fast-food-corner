import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

// ===== Local Asset Imports =====
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

// Fallback Unsplash image
const FALLBACK = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop";

// Map: image key (stored in DB) → local import
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
            <p>Menu load ho raha hai...</p>
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