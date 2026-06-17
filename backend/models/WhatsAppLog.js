const mongoose = require("mongoose");

const whatsappLogSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    body: { type: String, required: true },
    direction: { type: String, enum: ["incoming", "outgoing"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WhatsAppLog", whatsappLogSchema, "whatsapp_logs");
