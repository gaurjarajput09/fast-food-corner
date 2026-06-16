const express = require("express");
const router = express.Router();
const { sendWhatsAppMessage } = require("../services/whatsappService");

// POST ORDER
router.post("/place", async (req, res) => {
  try {
    const order = req.body;

    console.log("🧾 ORDER RECEIVED:");
    console.log(order);

    // Send WhatsApp order confirmation via Twilio to CUSTOMER
    const customerMessage = `🍔 ORDER CONFIRMED\n\n🧾 Order ID: ${order.orderId || "N/A"}\n👤 Name: ${order.name || "Customer"}\n💰 Total: ₹${order.total || "0"}\n\n🙏 Thank you for ordering from Fast Food Corner!`;
    await sendWhatsAppMessage(order.phone, customerMessage);

    // Send WhatsApp notification via Twilio to OWNER
    const ownerMessage = `🚨 NEW ORDER RECEIVED!\n\n🧾 Order ID: ${order.orderId || "N/A"}\n👤 Name: ${order.name || "Customer"}\n📞 Phone: ${order.phone}\n📍 Address: ${order.address}\n💰 Total: ₹${order.total || "0"}`;
    await sendWhatsAppMessage("916265935663", ownerMessage);

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