const express = require("express");
const router = express.Router();

// POST ORDER
router.post("/place", (req, res) => {
  try {
    const order = req.body;

    console.log("🧾 ORDER RECEIVED:");
    console.log(order);

    res.json({
      success: true,
      message: "Order placed successfully 🚀",
      orderId: order.orderId,
    });
  } catch (error) {
    console.log("Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

module.exports = router;