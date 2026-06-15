import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import slide1 from "../assets/homeslide.webp";
import slide2 from "../assets/homeslide2.jpg";
import slide3 from "../assets/homeslid3.jpg";

function Home() {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (window.bootstrap) {
      new window.bootstrap.Carousel(carouselRef.current, {
        interval: 3000,
        ride: "carousel",
        pause: false
      });
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center text-white position-relative" style={{ background: "transparent", overflow: "hidden" }}>
        
        {/* Background Slider */}
        <div id="heroCarousel" ref={carouselRef} className="carousel slide carousel-fade position-absolute w-100 h-100" data-bs-ride="carousel" data-bs-interval="3000" style={{ top: 0, left: 0, zIndex: -1 }}>
          <div className="carousel-inner w-100 h-100">
            <div className="carousel-item active w-100 h-100">
              <div className="w-100 h-100" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide1})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
            </div>
            <div className="carousel-item w-100 h-100">
              <div className="w-100 h-100" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide2})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
            </div>
            <div className="carousel-item w-100 h-100">
              <div className="w-100 h-100" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide3})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
            </div>
          </div>
        </div>

        <div className="container position-relative" data-aos="fade-right" style={{ zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-6 text-center text-lg-start mt-5 pt-5 pt-lg-0">

              <div className="mt-4 mb-3">
                <h1 className="display-5 display-md-3 fw-bolder text-warning">Fast Food Corner</h1>
              </div>

              <p className="lead mt-3">
                Authentic Indian, Chinese & Italian Cuisine
              </p>

              <p className="mb-4">
                Fresh Ingredients • Fast Service • Best Taste
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center justify-content-lg-start">
                <Link to="/Menu">
                  <button className="btn btn-warning btn-lg px-4 rounded-pill fw-bold text-dark">Explore Menu</button>
                </Link>

                <Link to="/booking">
                  <button className="btn btn-outline-warning btn-lg px-4 rounded-pill fw-bold">Book a Table</button>
                </Link>

                <Link to="/Contact">
                  <button className="btn btn-outline-light btn-lg px-4 rounded-pill">Contact Us</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5 bg-dark text-white" data-aos="fade-up">
        <div className="container">
          <h2 className="text-center mb-5">
            Food Categories
          </h2>

          <div className="row text-center">

            <div className="col-md-4 mb-4" data-aos="zoom-in">
              <div className="card p-4 h-100 bg-black border border-warning shadow-lg" style={{ borderRadius: "20px" }}>
                <h3 className="display-4">🍛</h3>
                <h5 className="text-warning mt-3 fw-bold">Indian</h5>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="zoom-in">
              <div className="card p-4 h-100 bg-black border border-warning shadow-lg" style={{ borderRadius: "20px" }}>
                <h3 className="display-4">🍜</h3>
                <h5 className="text-warning mt-3 fw-bold">Chinese</h5>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="zoom-in">
              <div className="card p-4 h-100 bg-black border border-warning shadow-lg" style={{ borderRadius: "20px" }}>
                <h3 className="display-4">🍕</h3>
                <h5 className="text-warning mt-3 fw-bold">Italian</h5>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-5 bg-black text-white" data-aos="fade-up">




        <div className="container">
          <h2 className="text-center mb-5">Popular Dishes</h2>

          <div className="row">

            <div className="col-md-4 mb-4" data-aos="flip-left">
              <div className="card h-100 bg-dark text-white border-0 shadow-lg" style={{ borderRadius: "15px", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
                  className="card-img-top"
                  alt="Paneer"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="text-warning">Paneer Butter Masala</h5>
                  <p className="text-light">Rich creamy Indian curry.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-dark text-white border-0 shadow-lg" style={{ borderRadius: "15px", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1585032226651-759b368d7246"
                  className="card-img-top"
                  alt="Noodles"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="text-warning">Hakka Noodles</h5>
                  <p className="text-light">Chinese style spicy noodles.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-dark text-white border-0 shadow-lg" style={{ borderRadius: "15px", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
                  className="card-img-top"
                  alt="Pizza"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="text-warning">Margherita Pizza</h5>
                  <p className="text-light">Classic Italian pizza.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="py-5 bg-dark text-white" data-aos="fade-up">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Us</h2>

          <div className="row text-center">

            <div className="col-md-3 mb-4 mb-md-0" data-aos="zoom-in">
              <h1 className="display-4">🍃</h1>
              <h4 className="text-warning mt-3">Fresh Ingredients</h4>
            </div>

            <div className="col-md-3 mb-4 mb-md-0" data-aos="zoom-in">
              <h1 className="display-4">👨‍🍳</h1>
              <h4 className="text-warning mt-3">Expert Chefs</h4>
            </div>

            <div className="col-md-3 mb-4 mb-md-0" data-aos="zoom-in">
              <h1 className="display-4">⚡</h1>
              <h4 className="text-warning mt-3">Fast Delivery</h4>
            </div>

            <div className="col-md-3 mb-4 mb-md-0" data-aos="zoom-in">
              <h1 className="display-4">⭐</h1>
              <h4 className="text-warning mt-3">Top Quality</h4>
            </div>

          </div>
        </div>
      </section>
      <section className="py-5 bg-black text-white" data-aos="fade-up"
      >
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>

          <div className="row">

            <div className="col-md-4 mb-4" data-aos="flip-up">
              <div className="card p-4 h-100 bg-dark text-white border-warning" style={{ borderRadius: "15px", borderStyle: "dashed", borderWidth: "2px" }}>
                <h5 className="text-warning">⭐⭐⭐⭐⭐</h5>
                <p className="mt-3 text-light font-italic">
                  "Amazing food and quick service. The best restaurant in town!"
                </p>
                <strong className="text-warning mt-auto">- Rahul Sharma</strong>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="flip-up">
              <div className="card p-4 h-100 bg-dark text-white border-warning" style={{ borderRadius: "15px", borderStyle: "dashed", borderWidth: "2px" }}>
                <h5 className="text-warning">⭐⭐⭐⭐⭐</h5>
                <p className="mt-3 text-light font-italic">
                  "Loved the Chinese food. Fresh and delicious."
                </p>
                <strong className="text-warning mt-auto">- Priya Verma</strong>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="flip-up">
              <div className="card p-4 h-100 bg-dark text-white border-warning" style={{ borderRadius: "15px", borderStyle: "dashed", borderWidth: "2px" }}>
                <h5 className="text-warning">⭐⭐⭐⭐⭐</h5>
                <p className="mt-3 text-light font-italic">
                  "Great ambience and excellent customer support."
                </p>
                <strong className="text-warning mt-auto">- Aman Singh</strong>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;