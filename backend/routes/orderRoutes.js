const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { sendWhatsAppMessage } = require("../services/whatsappService");

// POST ORDER
router.post("/place", async (req, res) => {
  try {
    const orderData = req.body;

    console.log("🧾 ORDER RECEIVED:");
    console.log(orderData);

    // Save order to MongoDB
    const newOrder = new Order({
      orderId: orderData.orderId,
      name: orderData.name,
      phone: orderData.phone,
      address: orderData.address,
      items: orderData.items,
      totalPrice: orderData.totalPrice,
    });
    await newOrder.save();

    // Send WhatsApp order confirmation via Twilio to CUSTOMER
    const customerMessage = `🍔 ORDER CONFIRMED\n\n🧾 Order ID: ${orderData.orderId || "N/A"}\n👤 Name: ${orderData.name || "Customer"}\n💰 Total: ₹${orderData.totalPrice || "0"}\n\n🙏 Thank you for ordering from Fast Food Corner!`;
    await sendWhatsAppMessage(orderData.phone, customerMessage);

    // Send WhatsApp notification via Twilio to OWNER
    const ownerMessage = `🚨 NEW ORDER RECEIVED!\n\n🧾 Order ID: ${orderData.orderId || "N/A"}\n👤 Name: ${orderData.name || "Customer"}\n📞 Phone: ${orderData.phone}\n📍 Address: ${orderData.address}\n💰 Total: ₹${orderData.totalPrice || "0"}`;
    await sendWhatsAppMessage("916265935663", ownerMessage);

    res.json({
      success: true,
      message: "Order placed successfully 🚀",
      orderId: orderData.orderId,
      data: newOrder,
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