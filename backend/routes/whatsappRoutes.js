const express = require('express');
const router = express.Router();
const { MessagingResponse } = require('twilio').twiml;

// POST /api/whatsapp/webhook
// Twilio sends a POST request here whenever someone messages the sandbox number
router.post('/webhook', (req, res) => {
  console.log('📨 Incoming WhatsApp Message:', req.body);

  const incomingMsg = req.body.Body ? req.body.Body.toLowerCase().trim() : '';
  const twiml = new MessagingResponse();

  // Basic Rule-Based Chatbot Logic
  let replyMessage = "";

  if (incomingMsg.includes('hi') || incomingMsg.includes('hello')) {
    replyMessage = "Hello! 👋 Welcome to Fast Food Corner. How can we help you today? \nReply with *Menu*, *Order*, or *Help*.";
  } 
  else if (incomingMsg.includes('menu')) {
    replyMessage = "🍔 You can view our delicious menu here: https://your-website.com/menu \nLet us know what you'd like to order!";
  } 
  else if (incomingMsg.includes('order')) {
    replyMessage = "🛒 To place a new order, please visit our website. \nIf you are asking about an existing order, please provide your *Order ID*.";
  } 
  else if (incomingMsg.includes('help')) {
    replyMessage = "📞 For any urgent queries, you can call our restaurant at +91-XXXXXXXXXX. We are happy to assist you!";
  } 
  else {
    replyMessage = "🤖 Thank you for your message! Our team is currently busy preparing delicious food, but we will get back to you shortly. \n(Reply with *Menu* or *Help* to see options)";
  }

  // Add the reply to the TwiML response
  twiml.message(replyMessage);

  // Send back XML format which Twilio expects
  res.set('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
});

module.exports = router;
