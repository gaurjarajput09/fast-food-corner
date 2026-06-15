import React from "react";

const Contact = () => {
  return (
    <div className="contact-page py-5">

      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">📞 Contact Us</h1>
          <p className="text-muted">
            We’d love to hear from you anytime
          </p>
        </div>

        <div className="row">

          {/* CONTACT FORM */}
          <div className="col-md-6 mb-4">

            <div className="card shadow p-4">

              <h4 className="mb-3">Send Message ✉️</h4>

              <form>
                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="Your Name" />
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Your Email" />
                </div>

                <div className="mb-3">
                  <label>Message</label>
                  <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
                </div>

                <button className="btn btn-warning w-100">
                  Send Message
                </button>
              </form>

            </div>

          </div>

          {/* CONTACT INFO */}
          <div className="col-md-6">

            <div className="p-4 shadow rounded bg-light">

              <h4>📍 Our Info</h4>

              <p>🏠 Fast Food Corner, Main Market</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ fastfood@gmail.com</p>

              <hr />

              <h5>⏰ Opening Hours</h5>
              <p>Mon - Fri: 10AM - 10PM</p>
              <p>Sat - Sun: 9AM - 11PM</p>

              <hr />

              <h5>🌐 Follow Us</h5>
              <p>Facebook | Instagram | Twitter</p>

            </div>

          </div>

        </div>

        {/* MAP SECTION */}
        <div className="mt-5">

          <h4 className="text-center mb-3">📍 Find Us Here</h4>

          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

        </div>

      </div>
    </div>
  );
};

export default Contact;