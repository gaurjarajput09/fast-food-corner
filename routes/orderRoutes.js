const express = require("express");
const router = express.Router();
const sendWhatsApp = require("../utils/whatsapp");

// POST ORDER
router.post("/place", async (req, res) => {
  try {
    const order = req.body;

    console.log("🧾 ORDER RECEIVED:");
    console.log(order);

    // WhatsApp message send AFTER order received
    await sendWhatsApp(order.phone, 
      `🍔 Order Confirmed!\nOrder ID: ${order.orderId}\nTotal: ${order.total}`
    );

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