import React from "react";
import { Link } from "react-router-dom";
import packagingImg from "../assets/packgingimg.png";
import chef1 from "../assets/chef1.webp";
import chef2 from "../assets/chef2.webp";
import chef3 from "../assets/chef3.webp";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <div className="about-hero text-center text-white d-flex align-items-center">
        <div className="container">
          <h1 className="fw-bold">🍔 Fast Food Corner</h1>
          <p>Where Taste Meets Happiness</p>
          <Link to="/menu" className="btn btn-warning mt-3">
            Explore Menu
          </Link>
        </div>
      </div>

      {/* ABOUT CONTENT */}
      <div className="container py-5">

        {/* WHO WE ARE */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-3">
            <img
              src="https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&h=400&fit=crop"
              className="img-fluid rounded shadow"
              alt="kitchen"
            />
          </div>
          <div className="col-md-6">
            <h2>Who We Are 🍽️</h2>
            <p className="text-muted">
              Fast Food Corner is your go-to place for delicious burgers,
              pizzas, and snacks made with fresh ingredients and love.
            </p>
            <p className="text-muted">
              We focus on quality, hygiene, and fast service to make every meal
              memorable.
            </p>
            <ul>
              <li>✔ Fresh Ingredients</li>
              <li>✔ Fast Service</li>
              <li>✔ Hygienic Kitchen</li>
              <li>✔ Affordable Prices</li>
            </ul>
          </div>
        </div>

        {/* STATS */}
        <div className="row text-center mb-5">
          <div className="col-md-4">
            <h2 className="text-warning fw-bold">10K+</h2>
            <p>Happy Customers</p>
          </div>
          <div className="col-md-4">
            <h2 className="text-warning fw-bold">50+</h2>
            <p>Menu Items</p>
          </div>
          <div className="col-md-4">
            <h2 className="text-warning fw-bold">5⭐</h2>
            <p>Ratings</p>
          </div>
        </div>

        {/* ✅ PACKAGING SECTION */}
        <div className="packaging-section">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="packaging-img-wrapper">
                <img
                  src={packagingImg}
                  alt="Our Premium Packaging"
                  className="packaging-img"
                />
              </div>
            </div>
            <div className="col-md-6">
              <span className="packaging-tag">🎁 Premium Packaging</span>
              <h2 className="packaging-title">
                Delivered Fresh,<br />Packed with Care
              </h2>
              <p className="packaging-desc">
                At Fast Food Corner, we believe great food deserves great packaging.
                Every order is carefully packed to maintain freshness, temperature,
                and presentation — from our kitchen to your doorstep.
              </p>
              <div className="packaging-features">
                <div className="pkg-feature">
                  <span>🌿</span>
                  <div>
                    <strong>Eco-Friendly</strong>
                    <p>Biodegradable and sustainable packaging materials</p>
                  </div>
                </div>
                <div className="pkg-feature">
                  <span>🔒</span>
                  <div>
                    <strong>Tamper-Proof</strong>
                    <p>Sealed for your safety and hygiene</p>
                  </div>
                </div>
                <div className="pkg-feature">
                  <span>🌡️</span>
                  <div>
                    <strong>Temperature Locked</strong>
                    <p>Hot stays hot, cold stays cold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHEF SECTION */}
        <div className="container py-5 mt-4">
          <h2 className="text-center mb-5" style={{ fontSize: "2.5rem", fontWeight: "800", color: "#00b4d8" }}>👨‍🍳 Meet Our Master Chefs</h2>
          <div className="row text-center mb-5 justify-content-center">
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="premium-chef-card">
                <div className="premium-chef-img-wrap">
                  <img src={chef1} className="premium-chef-img" alt="Chef Rahul" />
                </div>
                <div className="premium-chef-body">
                  <h5 className="chef-name">Chef Rahul</h5>
                  <p className="chef-role">Burger Specialist</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="premium-chef-card">
                <div className="premium-chef-img-wrap">
                  <img src={chef2} className="premium-chef-img" alt="Chef Anjali" />
                </div>
                <div className="premium-chef-body">
                  <h5 className="chef-name">Chef Anjali</h5>
                  <p className="chef-role">Pizza Expert</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="premium-chef-card">
                <div className="premium-chef-img-wrap">
                  <img src={chef3} className="premium-chef-img" alt="Chef Mohit" />
                </div>
                <div className="premium-chef-body">
                  <h5 className="chef-name">Chef Mohit</h5>
                  <p className="chef-role">Dessert Master</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* TESTIMONIALS */}
        <h3 className="text-center mb-4">⭐ Customer Reviews</h3>
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="p-3 shadow rounded">
              "Best burgers in town! Fast service 🔥"
              <h6 className="mt-2">- Ravi</h6>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 shadow rounded">
              "Amazing pizza and friendly staff 🍕"
              <h6 className="mt-2">- Priya</h6>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 shadow rounded">
              "Very clean and tasty food 😍"
              <h6 className="mt-2">- Aman</h6>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="text-center mt-5 p-5 bg-dark text-white rounded">
          <h2>Hungry? Order Now 🍔</h2>
          <p>Fresh food delivered in minutes</p>
          <Link to="/menu" className="btn btn-warning">
            Go to Menu
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;