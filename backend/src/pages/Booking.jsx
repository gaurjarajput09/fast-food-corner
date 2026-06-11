

import React, { useState } from "react";
import axios from "axios";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "",
    message: "",
  });

  // 📌 WhatsApp only
  const sendToWhatsApp = (data) => {
    const phoneNumber = "916265935663";

    const orderId = "FC" + Date.now();
    const bookingTime = new Date().toLocaleString();

    const message = `
🍔 TABLE BOOKING

🆔 Order ID: ${orderId}

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📅 Date: ${data.date}
👥 Guests: ${data.guests}
💬 Message: ${data.message || "N/A"}

⏰ Booking Time: ${bookingTime}

✅ Your request has been received
We will contact you soon.
    `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://fast-food-corner-backend.onrender.com/api/bookings", formData);

      alert("Booking successful 🎉");

      sendToWhatsApp(formData);

      setFormData({
        name: "",
        phone: "",
        date: "",
        guests: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Booking failed ❌");
    }
  };

  return (
    <div className="booking">
      <h2>🍔 Table Booking</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="guests"
          placeholder="Guests"
          value={formData.guests}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Book Now 🍔</button>
      </form>
    </div>
  );
};

export default Booking;