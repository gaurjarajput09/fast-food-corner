import React from "react";

const Contact = () => {
  return (
    <div className="contact-page-new">
      {/* Hero */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-hero-badge">💬 Get in Touch</span>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out anytime!</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-60px", position: "relative", zIndex: 2, paddingBottom: "80px" }}>
        <div className="contact-grid" data-aos="fade-up">
          {/* Contact Form */}
          <div className="contact-form-card">
            <h3 className="contact-card-title">✉️ Send us a Message</h3>
            <p className="contact-card-subtitle">Fill out the form and we'll get back to you shortly.</p>
            
            <form>
              <div className="contact-input-group">
                <label>Your Name</label>
                <input type="text" className="contact-input" placeholder="John Doe" />
              </div>

              <div className="contact-input-group">
                <label>Email Address</label>
                <input type="email" className="contact-input" placeholder="you@example.com" />
              </div>

              <div className="contact-input-group">
                <label>Subject</label>
                <input type="text" className="contact-input" placeholder="How can we help?" />
              </div>

              <div className="contact-input-group">
                <label>Message</label>
                <textarea className="contact-input contact-textarea" rows="4" placeholder="Write your message here..."></textarea>
              </div>

              <button type="button" className="contact-submit-btn">
                Send Message →
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="contact-info-panel">
            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <h5>Visit Us</h5>
              <p>Fast Food Corner, Main Market</p>
              <p>Panna, Madhya Pradesh</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">📞</div>
              <h5>Call Us</h5>
              <p>+91 6265935663</p>
              <p>Mon - Sun: 10AM - 11PM</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">✉️</div>
              <h5>Email Us</h5>
              <p>info@fastfoodcorner.com</p>
              <p>Response within 24 hours</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">⏰</div>
              <h5>Opening Hours</h5>
              <p>Mon - Fri: 10AM - 10PM</p>
              <p>Sat - Sun: 9AM - 11PM</p>
            </div>

            {/* Social Links */}
            <div className="contact-socials">
              <h5>Follow Us</h5>
              <div className="contact-social-links">
                <a href="#" className="contact-social-btn">Facebook</a>
                <a href="#" className="contact-social-btn">Instagram</a>
                <a href="#" className="contact-social-btn">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="contact-map-section" data-aos="fade-up">
          <h3 className="contact-map-title">📍 Find Us Here</h3>
          <div className="contact-map-wrapper">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14588.64!2d80.18!3d24.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2b!2sPanna!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;