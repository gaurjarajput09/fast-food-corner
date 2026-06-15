// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   guests: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//   },
// });

// module.exports = mongoose.model("Booking", bookingSchema);





const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  guests: Number,
  message:String,
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema, "bookings");