const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/Order");
const Booking = require("../models/Booking");
const WhatsAppLog = require("../models/WhatsAppLog");

const router = express.Router();

// Middleware to verify Admin JWT
const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify admin email matches the .env ADMIN_EMAIL config
    if (user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Access denied. Owners only." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Admin verification error:", err);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

// ─── ADMIN STATS ─────────────────────────────────────────
router.get("/stats", isAdmin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const messageCount = await WhatsAppLog.countDocuments();

    res.json({
      users: userCount,
      orders: orderCount,
      bookings: bookingCount,
      messages: messageCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching stats" });
  }
});

// ─── ADMIN USERS ─────────────────────────────────────────
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// ─── ADMIN ORDERS ────────────────────────────────────────
router.get("/orders", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching orders" });
  }
});

// Update Order Status
router.patch("/orders/:id", isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error updating order status" });
  }
});

// ─── ADMIN BOOKINGS ──────────────────────────────────────
router.get("/bookings", isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching bookings" });
  }
});

// ─── ADMIN WHATSAPP LOGS ─────────────────────────────────
router.get("/whatsapp-logs", isAdmin, async (req, res) => {
  try {
    const logs = await WhatsAppLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching whatsapp logs" });
  }
});

module.exports = router;
