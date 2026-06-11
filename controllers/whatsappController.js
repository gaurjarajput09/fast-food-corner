const axios = require("axios");

const sendWhatsAppMessage = async (number, message) => {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.PHONE_NUMBER_ID;

  return await axios.post(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      messaging_product: "whatsapp",
      to: number,
      type: "text",
      text: { body: message }
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

module.exports = { sendWhatsAppMessage };