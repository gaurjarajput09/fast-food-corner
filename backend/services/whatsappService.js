const twilio = require('twilio');

// Load environment variables if not already loaded
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., 'whatsapp:+14155238886'

let client;
if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
} else {
  console.warn('⚠️ Twilio Account SID or Auth Token missing in .env. WhatsApp notifications are disabled.');
}

/**
 * Send a WhatsApp message using Twilio
 * @param {string} to - The recipient phone number (e.g., '+919876543210')
 * @param {string} message - The text message to send
 * @returns {Promise<boolean>} - True if sent, false otherwise
 */
const sendWhatsAppMessage = async (to, message) => {
  if (!client || !twilioWhatsAppNumber) {
    console.log('Skipping WhatsApp message (Twilio not configured):', message);
    return false;
  }

  try {
    // Format the number to include 'whatsapp:' prefix if not present
    const toFormatted = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

    const response = await client.messages.create({
      body: message,
      from: twilioWhatsAppNumber,
      to: toFormatted
    });

    console.log(`✅ WhatsApp message sent to ${to}: ${response.sid}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send WhatsApp message to ${to}:`, error.message);
    return false;
  }
};

module.exports = {
  sendWhatsAppMessage
};
