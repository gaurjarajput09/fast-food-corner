const axios = require("axios");

const sendWhatsApp = async (phone, order) => {
  try {
    if (!phone) {
      console.log("❌ Phone number missing");
      return;
    }

    const url = `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`;

    const itemsText = Array.isArray(order.items)
      ? order.items.map(i => i.name).join(", ")
      : order.items;

    const message = `
🍔 ORDER CONFIRMED

🧾 Order ID: ${order.orderId || "N/A"}
👤 Name: ${order.name || "Customer"}
📦 Items: ${itemsText || "N/A"}
💰 Total: ₹${order.total || "0"}

🙏 Thank you for ordering!
`;

    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ WhatsApp sent:", response.data);
    return response.data;

  } catch (error) {
    console.log("❌ WhatsApp Error:", error.response?.data || error.message);
  }
};

module.exports = sendWhatsApp;