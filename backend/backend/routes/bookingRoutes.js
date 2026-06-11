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

// CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

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