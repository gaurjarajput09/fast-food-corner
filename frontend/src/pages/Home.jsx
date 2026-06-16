import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

// ===== Local Asset Imports for Slides =====
import slide1 from "../assets/homeslide.webp";
import slide2 from "../assets/homeslide2.jpg";
import slide3 from "../assets/homeslid3.jpg";

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

function Home({ addToCart }) {
  const carouselRef = useRef(null);
  const [trendingItems, setTrendingItems] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.bootstrap) {
      new window.bootstrap.Carousel(carouselRef.current, {
        interval: 3000,
        ride: "carousel",
        pause: false
      });
    }
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/menu`);
        // Select some highlighted dishes
        const items = res.data.filter(item => 
          ["Butter Paneer", "Veg Pizza", "Hakka Noodles", "Cheese Burger", "Cold Coffee", "White Sauce Pasta"].includes(item.name)
        );
        // Fallback to first 6 items if not found
        setTrendingItems(items.length > 0 ? items : res.data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching trending menu:", err);
      }
    };
    fetchTrending();
  }, []);

  // Auto-play slider
  useEffect(() => {
    if (trendingItems.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [trendingItems, slideIndex, isMobile]);

  const maxSlideIndex = trendingItems.length > 0 
    ? Math.max(0, trendingItems.length - (isMobile ? 1 : 3)) 
    : 0;

  const nextSlide = () => {
    setSlideIndex((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev <= 0 ? maxSlideIndex : prev - 1));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center text-white position-relative" style={{ background: "transparent", overflow: "hidden" }}>
        
        {/* Background Slider */}
        <div id="heroCarousel" ref={carouselRef} className="carousel slide carousel-fade position-absolute w-100 h-100" data-bs-ride="carousel" data-bs-interval="3000" style={{ top: 0, left: 0, zIndex: -1 }}>
          <div className="carousel-inner w-100 h-100">
            <div className="carousel-item active w-100 h-100">
              <div className="w-100 h-100" style={{ backgroundImage: `linear-gradient(rgba(3, 7, 24, 0.65), rgba(3, 7, 24, 0.65)), url(${slide1})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
            </div>
            <div className="carousel-item w-100 h-100">
              <div className="w-100 h-100" style={{ backgroundImage: `linear-gradient(rgba(3, 7, 24, 0.65), rgba(3, 7, 24, 0.65)), url(${slide2})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
            </div>
            <div className="carousel-item w-100 h-100">
              <div className="w-100 h-100" style={{ backgroundImage: `linear-gradient(rgba(3, 7, 24, 0.65), rgba(3, 7, 24, 0.65)), url(${slide3})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
            </div>
          </div>
        </div>

        <div className="container position-relative" data-aos="fade-right" style={{ zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-7 text-center text-lg-start mt-5 pt-5 pt-lg-0">
              <div className="glass-panel p-5 text-white shadow-2xl">
                <span className="badge bg-info text-dark rounded-pill px-3 py-2 fw-bold mb-3 uppercase tracking-wider">🔥 Taste the Magic</span>
                <h1 className="display-4 fw-bolder text-white mb-3" style={{ lineHeight: 1.1 }}>
                  Fast Food <span style={{ color: "#00b4d8" }}>Corner</span>
                </h1>
                <p className="lead mb-4" style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1.15rem" }}>
                  Authentic Indian, Chinese & Italian Cuisine prepared by expert master chefs. Fresh ingredients, lightning-fast delivery, and an unforgettable taste!
                </p>
                <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center justify-content-lg-start">
                  <Link to="/menu" className="btn btn-warning btn-lg px-4 rounded-pill fw-bold text-dark shadow">Explore Menu 🍔</Link>
                  <Link to="/booking" className="btn btn-outline-warning btn-lg px-4 rounded-pill fw-bold">Book a Table 📅</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Food Slider Section */}
      <section className="py-5 text-white" style={{ background: "#060d26", borderTop: "1px solid rgba(0, 180, 216, 0.1)" }}>
        <div className="container" data-aos="fade-up">
          <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
            <div>
              <span className="text-info fw-bold text-uppercase tracking-wider">🔥 Customer Favorites</span>
              <h2 className="display-6 fw-bold mt-2">Trending Dishes</h2>
            </div>
            <div className="slider-controls">
              <button className="slider-btn" onClick={prevSlide}>◀</button>
              <button className="slider-btn" onClick={nextSlide}>▶</button>
            </div>
          </div>

          {trendingItems.length === 0 ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info" role="status"></div>
              <p className="mt-3 text-muted">Loading chef favorites...</p>
            </div>
          ) : (
            <div className="slider-container">
              <div className="slider-track" style={{ transform: `translateX(-${slideIndex * (100 / (isMobile ? 1 : 3))}%)` }}>
                {trendingItems.map((item) => (
                  <div className="slider-slide" key={item._id}>
                    <div className="slider-card glass-card">
                      <div className="slider-img-wrap">
                        <img src={getImage(item.image)} alt={item.name} className="slider-img" />
                        <span className="slider-badge">⭐ 4.9</span>
                      </div>
                      <div className="slider-info">
                        <span className="badge bg-dark text-info border border-info rounded-pill align-self-start mb-2 px-3">{item.cuisine}</span>
                        <h4 className="slider-name">{item.name}</h4>
                        <p className="slider-desc">{item.description}</p>
                        <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-secondary-subtle">
                          <span className="fs-5 fw-bold text-info">₹{item.price}</span>
                          <button className="btn btn-outline-info rounded-pill px-4 btn-sm fw-bold" onClick={() => addToCart(item)}>
                            🛒 Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Food Categories */}
      <section className="py-5 text-white" style={{ background: "#030718" }} data-aos="fade-up">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-info fw-bold text-uppercase tracking-wider">Categories</span>
            <h2 className="display-6 fw-bold mt-2">Food Categories</h2>
          </div>

          <div className="row text-center">
            <div className="col-md-4 mb-4" data-aos="zoom-in">
              <div className="card p-5 h-100 glass-card">
                <div className="display-3 mb-3">🍛</div>
                <h4 className="text-info fw-bold mb-3">Indian Cuisine</h4>
                <p className="text-light-muted">Rich gravies, fresh paneer, and hot tandoori breads cooked to perfection.</p>
                <Link to="/menu" className="btn btn-sm btn-outline-info rounded-pill px-4 mt-3">View Menu</Link>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="card p-5 h-100 glass-card">
                <div className="display-3 mb-3">🍜</div>
                <h4 className="text-info fw-bold mb-3">Chinese Cuisine</h4>
                <p className="text-light-muted">Spicy wok-tossed noodles, fried rice, and savory starters made fresh daily.</p>
                <Link to="/menu" className="btn btn-sm btn-outline-info rounded-pill px-4 mt-3">View Menu</Link>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="card p-5 h-100 glass-card">
                <div className="display-3 mb-3">🍕</div>
                <h4 className="text-info fw-bold mb-3">Italian Cuisine</h4>
                <p className="text-light-muted">Artisanal pizzas, cheesy lasagna, and delicious pastas in signature sauces.</p>
                <Link to="/menu" className="btn btn-sm btn-outline-info rounded-pill px-4 mt-3">View Menu</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 text-white" style={{ background: "#060d26" }} data-aos="fade-up">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-info fw-bold text-uppercase tracking-wider">Features</span>
            <h2 className="display-6 fw-bold mt-2">Why Foodies Love Us</h2>
          </div>

          <div className="row text-center">
            <div className="col-md-3 mb-4 mb-md-0" data-aos="zoom-in">
              <div className="p-4">
                <h1 className="display-4">🍃</h1>
                <h4 className="text-info mt-3 fw-bold">Fresh Ingredients</h4>
                <p className="text-muted small">Only premium quality and fresh organic supplies.</p>
              </div>
            </div>

            <div className="col-md-3 mb-4 mb-md-0" data-aos="zoom-in" data-aos-delay="100">
              <div className="p-4">
                <h1 className="display-4">👨‍🍳</h1>
                <h4 className="text-info mt-3 fw-bold">Expert Chefs</h4>
                <p className="text-muted small">Crafting culinary magic for over a decade.</p>
              </div>
            </div>

            <div className="col-md-3 mb-4 mb-md-0" data-aos="zoom-in" data-aos-delay="200">
              <div className="p-4">
                <h1 className="display-4">⚡</h1>
                <h4 className="text-info mt-3 fw-bold">Fast Delivery</h4>
                <p className="text-muted small">Hot and fresh delivery straight to your door.</p>
              </div>
            </div>

            <div className="col-md-3 mb-4 mb-md-0" data-aos="zoom-in" data-aos-delay="300">
              <div className="p-4">
                <h1 className="display-4">⭐</h1>
                <h4 className="text-info mt-3 fw-bold">Top Quality</h4>
                <p className="text-muted small">Hygiene-certified kitchen and five-star rating.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 text-white" style={{ background: "#030718" }} data-aos="fade-up">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-info fw-bold text-uppercase tracking-wider">Testimonials</span>
            <h2 className="display-6 fw-bold mt-2">What Our Customers Say</h2>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4" data-aos="flip-up">
              <div className="card p-4 h-100 glass-card text-center">
                <h5 className="text-info mb-3">⭐⭐⭐⭐⭐</h5>
                <p className="mt-2 text-light font-italic small mb-4">
                  "Amazing food and quick service. The best restaurant in town! The Butter Paneer is to die for."
                </p>
                <strong className="text-white mt-auto">- Rahul Sharma</strong>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="flip-up" data-aos-delay="100">
              <div className="card p-4 h-100 glass-card text-center">
                <h5 className="text-info mb-3">⭐⭐⭐⭐⭐</h5>
                <p className="mt-2 text-light font-italic small mb-4">
                  "Loved the Hakka Noodles and Spring Rolls. The taste is authentic and premium. Highly recommended!"
                </p>
                <strong className="text-white mt-auto">- Priya Verma</strong>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="flip-up" data-aos-delay="200">
              <div className="card p-4 h-100 glass-card text-center">
                <h5 className="text-info mb-3">⭐⭐⭐⭐⭐</h5>
                <p className="mt-2 text-light font-italic small mb-4">
                  "Great website and excellent customer support. Placing orders via WhatsApp is so fast and convenient."
                </p>
                <strong className="text-white mt-auto">- Aman Singh</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;