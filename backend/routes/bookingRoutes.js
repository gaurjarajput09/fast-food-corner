// const express = require("express");
// const router = express.Router();

// router.post("/", (req, res) => {
//   try {
//     console.log("Booking:", req.body);

//     return res.json({
//       success: true,
//       message: "Booking successful"
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { sendWhatsAppMessage } = require("../services/whatsappService");

// CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    // Send WhatsApp booking confirmation via Twilio to CUSTOMER
    if (newBooking.phone) {
      const customerMessage = `📅 BOOKING CONFIRMED\n\n👤 Name: ${newBooking.name}\n👥 Guests: ${newBooking.guests}\n🕒 Date: ${newBooking.date}\n⏰ Time: ${newBooking.time}\n\n🙏 Thank you! We look forward to hosting you at Fast Food Corner!`;
      await sendWhatsAppMessage(newBooking.phone, customerMessage);
    }

    // Send WhatsApp notification via Twilio to OWNER
    const ownerMessage = `🚨 NEW TABLE BOOKING!\n\n👤 Name: ${newBooking.name}\n📞 Phone: ${newBooking.phone}\n👥 Guests: ${newBooking.guests}\n🕒 Date: ${newBooking.date}\n⏰ Time: ${newBooking.time}`;
    await sendWhatsAppMessage("916265935663", ownerMessage);

    res.json({
      success: true,
      message: "Booking successful 🚀",
      data: newBooking
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;