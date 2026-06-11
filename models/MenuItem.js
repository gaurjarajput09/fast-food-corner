const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Indian, Chinese, Italian, Burger, etc.
  cuisine: { type: String, required: true },  // Indian, Chinese, Italian, Fast Food
  description: { type: String },
  image: { type: String, required: true },
  isVeg: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);
