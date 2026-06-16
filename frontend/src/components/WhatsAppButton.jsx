import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "916265935663";
  const message = "Hi! I want to order from Fast Food Corner 🍔";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      title="Order via WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="whatsapp-icon">
        <path
          fill="#fff"
          d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.336 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.822-6.8-8.06-7.114-.228-.314-1.926-2.566-1.926-4.892s1.22-3.472 1.652-3.948c.434-.476.946-.594 1.262-.594.316 0 .63.002.908.016.29.016.682-.112 1.066.814.39.946 1.33 3.248 1.446 3.484.118.236.196.51.04.824-.158.314-.236.51-.472.786-.236.274-.496.614-.71.824-.236.236-.482.494-.208.968.276.476 1.226 2.024 2.632 3.278 1.808 1.614 3.332 2.114 3.808 2.35.476.236.754.196 1.03-.118.276-.314 1.184-1.38 1.5-1.856.316-.476.632-.394 1.066-.236.434.158 2.756 1.3 3.228 1.536.476.236.79.354.908.55.118.196.118 1.13-.272 2.23z"
        />
      </svg>
      <span className="whatsapp-fab-pulse" />
    </a>
  );
};

export default WhatsAppButton;
