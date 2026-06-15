import { useState, useRef, useEffect } from "react";

// ===== Restaurant Knowledge Base =====
const getBotReply = (input) => {
  const msg = input.toLowerCase().trim();

  // Detect language (Hindi if contains common Hinglish words, else English)
  const isHindi = /kya|hai|kab|kitne|baje|kahan|kaise|mujhe|karna|batao|bhai|namaste|hlo|shukriya|dhanyawad|alvida|chal|baad|mein|khao|raho|haan|nhi|nahi|mat|acha|thik|theek|ghar|karo|do/.test(msg);

  // Greetings
  if (/^(hi|hello|hey|hlo|hii|namaste|namaskar|sup|yo)\b/.test(msg))
    return isHindi
      ? "👋 Namaste! Main Fast Food Corner ka assistant hoon. Menu, delivery, booking ya koi bhi sawaal puchho — main help karunga! 😊"
      : "👋 Hello! I am the Fast Food Corner assistant. Ask me about our menu, delivery, bookings, or anything else — I'm here to help! 😊";

  // Timing / Hours
  if (/timing|hours|open|close|time|schedule|kab|kitne baje/.test(msg))
    return isHindi
      ? "🕙 Hum **10:00 AM se 11:00 PM** tak khule rehte hain — Hafte ke saatho din! Sunday bhi open hain."
      : "🕙 We are open from **10:00 AM to 11:00 PM** — All seven days of the week! Open on Sundays too.";

  // Menu / Food
  if (/menu|food|item|dish|kya h|kya hai|available|variety/.test(msg))
    return isHindi
      ? "🍽️ Hamare menu mein shamil hain:\n• 🍛 **Indian** — Paneer, Dal, Biryani, Roti\n• 🥡 **Chinese** — Noodles, Fried Rice, Manchurian\n• 🍕 **Italian** — Pizza, Pasta, Lasagna\n• 🍔 **Fast Food** — Burger, Fries, Sandwich\n\nPuri detail ke liye /menu page dekhein!"
      : "🍽️ Our menu includes:\n• 🍛 **Indian** — Paneer, Dal, Biryani, Roti\n• 🥡 **Chinese** — Noodles, Fried Rice, Manchurian\n• 🍕 **Italian** — Pizza, Pasta, Lasagna\n• 🍔 **Fast Food** — Burger, Fries, Sandwich\n\nCheck out the /menu page for full details!";

  // Indian food
  if (/indian|paneer|dal|biryani|roti|naan|curry|masala|bhature|paratha/.test(msg))
    return isHindi
      ? "🍛 Hamare popular Indian dishes:\n• Butter Paneer – ₹260\n• Palak Paneer – ₹220\n• Chole Bhature – ₹150\n• Dal Makhani – ₹180\n• Garlic Naan – ₹60\n• Biryani – ₹320\n\nSabhi fresh ingredients se banaye jaate hain! 🌿"
      : "🍛 Our popular Indian dishes:\n• Butter Paneer – ₹260\n• Palak Paneer – ₹220\n• Chole Bhature – ₹150\n• Dal Makhani – ₹180\n• Garlic Naan – ₹60\n• Biryani – ₹320\n\nAll made with fresh ingredients! 🌿";

  // Chinese food
  if (/chinese|noodles|fried rice|manchurian|momos|spring roll|hakka|shezwan|szechuan/.test(msg))
    return isHindi
      ? "🥡 Hamare Chinese specialties:\n• Hakka Noodles – ₹160\n• Shezwan Noodles – ₹190\n• Shezwan Fried Rice – ₹180\n• Chicken Manchurian – ₹240\n• Spring Rolls – ₹130\n• Tofu Stir Fry – ₹180"
      : "🥡 Our Chinese specialties:\n• Hakka Noodles – ₹160\n• Shezwan Noodles – ₹190\n• Shezwan Fried Rice – ₹180\n• Chicken Manchurian – ₹240\n• Spring Rolls – ₹130\n• Tofu Stir Fry – ₹180";

  // Italian food
  if (/italian|pizza|pasta|lasagna|macaroni|garlic bread|white sauce|red sauce|pink sauce/.test(msg))
    return isHindi
      ? "🍕 Hamare Italian delights:\n• Margherita Pizza – ₹280\n• Red Sauce Pasta – ₹220\n• Pink Sauce Pasta – ₹260\n• White Sauce Pasta – ₹240\n• Lasagna – ₹350\n• Garlic Bread – ₹140"
      : "🍕 Our Italian delights:\n• Margherita Pizza – ₹280\n• Red Sauce Pasta – ₹220\n• Pink Sauce Pasta – ₹260\n• White Sauce Pasta – ₹240\n• Lasagna – ₹350\n• Garlic Bread – ₹140";

  // Fast food
  if (/burger|fries|sandwich|fast food|cold coffee|ice cream/.test(msg))
    return isHindi
      ? "🍔 Fast Food Corner specials:\n• Cheese Burger – ₹120\n• French Fries – ₹80\n• Veg Sandwich – ₹90\n• Cold Coffee – ₹90\n• Ice Cream – ₹70"
      : "🍔 Fast Food Corner specials:\n• Cheese Burger – ₹120\n• French Fries – ₹80\n• Veg Sandwich – ₹90\n• Cold Coffee – ₹90\n• Ice Cream – ₹70";

  // Delivery
  if (/delivery|deliver|home|ghar|door|order online|online order/.test(msg))
    return isHindi
      ? "🛵 Haan! Home delivery available hai.\n• **Delivery time:** 30–45 minutes\n• **Minimum order:** ₹150\n• **Delivery area:** 5km radius\n• **Charges:** ₹30 (Free above ₹300)\n\nAbhi order karne ke liye Menu → Cart mein jaayein!"
      : "🛵 Yes! Home delivery is available.\n• **Delivery time:** 30–45 minutes\n• **Minimum order:** ₹150\n• **Delivery area:** 5km radius\n• **Charges:** ₹30 (Free above ₹300)\n\nGo to Menu → Cart to order now!";

  // Delivery time
  if (/kitne time|how long|time lagega|late|delay|wait/.test(msg))
    return isHindi
      ? "⏱️ Aamtaur par delivery **30–45 minutes** mein ho jaati hai. Peak hours (7PM–9PM) mein thoda zyada waqt lag sakta hai."
      : "⏱️ Delivery usually takes **30–45 minutes**. It might take a bit longer during peak hours (7PM–9PM).";

  // Table booking / reservation
  if (/book|reservation|table|seat|reserve|booking/.test(msg))
    return isHindi
      ? "📅 Table booking ke liye:\n1. Website ke **Book Table** section mein jaayein\n2. Naam, phone, date aur guests ki jankari bharein\n3. Confirm hone par call aayega!\n\nYa WhatsApp karein: **+91-6265935663"
      : "📅 For table booking:\n1. Go to the **Book Table** section on our website\n2. Fill in your name, phone, date, and number of guests\n3. We will call you to confirm!\n\nOr WhatsApp us: **+91-6265935663";

  // Price / cost
  if (/price|cost|kitna|rate|cheap|costly|expensive|affordable|paisa/.test(msg))
    return isHindi
      ? "💰 Hamare prices bahut reasonable hain!\n• Starters: ₹60 – ₹180\n• Main Course: ₹120 – ₹350\n• Drinks: ₹40 – ₹90\n• Desserts: ₹70 – ₹200\n\nKisi specific dish ki price jaanni ho toh pucho!"
      : "💰 Our prices are very reasonable!\n• Starters: ₹60 – ₹180\n• Main Course: ₹120 – ₹350\n• Drinks: ₹40 – ₹90\n• Desserts: ₹70 – ₹200\n\nAsk me if you want to know the price of a specific dish!";

  // Veg / Non-veg
  if (/veg|vegetarian|nonveg|non-veg|chicken|paneer|egg/.test(msg))
    return isHindi
      ? "🟢 Haan! Hamare menu mein both **Veg aur Non-Veg** options hain.\n• Pure Veg dishes clearly marked hain\n• Non-veg mein Chicken dishes available hain\n\nMenu page par 🟢 Veg / 🔴 Non-Veg badge dikhega!"
      : "🟢 Yes! We have both **Veg and Non-Veg** options on our menu.\n• Pure Veg dishes are clearly marked\n• Chicken dishes are available in Non-veg\n\nLook for the 🟢 Veg / 🔴 Non-Veg badge on the Menu page!";

  // Payment
  if (/payment|pay|cash|upi|card|gpay|paytm|phonepe|online pay/.test(msg))
    return isHindi
      ? "💳 Hum sab payment methods accept karte hain:\n• 💵 Cash\n• 📱 UPI (GPay, PhonePe, Paytm)\n• 💳 Credit / Debit Card\n• 🏦 Net Banking"
      : "💳 We accept all payment methods:\n• 💵 Cash\n• 📱 UPI (GPay, PhonePe, Paytm)\n• 💳 Credit / Debit Card\n• 🏦 Net Banking";

  // Offers / Discount
  if (/offer|discount|coupon|deal|promo|sale|free|bachao/.test(msg))
    return isHindi
      ? "🎉 Hamare current offers:\n• **Weekend Special:** 10% off on orders above ₹500\n• **First Order:** ₹50 off with code WELCOME50\n• **Combo Meal:** Burger + Fries + Drink = ₹220 only!\n\nOffer ke liye order karte waqt code enter karein."
      : "🎉 Our current offers:\n• **Weekend Special:** 10% off on orders above ₹500\n• **First Order:** ₹50 off with code WELCOME50\n• **Combo Meal:** Burger + Fries + Drink = ₹220 only!\n\nEnter the code while ordering to claim the offer.";

  // Location / Address
  if (/address|location|kahan|where|map|direction|locate/.test(msg))
    return isHindi
      ? "📍 **Fast Food Corner**\nNear Main Market, City Center\nPhone: +91-XXXXXXXXXX\n\nGoogle Maps pe search karein: 'Fast Food Corner' — hum aasaani se mil jaayenge!"
      : "📍 **Fast Food Corner**\nNear Main Market, City Center\nPhone: +91-XXXXXXXXXX\n\nSearch 'Fast Food Corner' on Google Maps — you'll easily find us!";

  // Contact / Phone
  if (/contact|phone|call|number|helpline|support|whatsapp/.test(msg))
    return isHindi
      ? "📞 Hamare contact details:\n• **Phone:** +91-XXXXXXXXXX\n• **WhatsApp:** +91-XXXXXXXXXX\n• **Email:** fastfoodcorner@email.com\n• **Timing:** 10AM – 11PM\n\nContact page pe bhi full details hain!"
      : "📞 Our contact details:\n• **Phone:** +91-XXXXXXXXXX\n• **WhatsApp:** +91-XXXXXXXXXX\n• **Email:** fastfoodcorner@email.com\n• **Timing:** 10AM – 11PM\n\nFull details are also available on the Contact page!";

  // Hygiene / Quality
  if (/hygiene|clean|quality|fresh|safe|healthy/.test(msg))
    return isHindi
      ? "🌿 Hamare kitchen mein:\n• Roz fresh ingredients use hote hain\n• FSSAI certified kitchen\n• Daily deep cleaning hoti hai\n• Trained aur certified chefs\n\nAapki sehat hamaari priority hai! 🏆"
      : "🌿 In our kitchen:\n• We use fresh ingredients daily\n• FSSAI certified kitchen\n• Daily deep cleaning\n• Trained and certified chefs\n\nYour health is our priority! 🏆";

  // Packaging
  if (/packaging|pack|parcel|takeaway|take away|box/.test(msg))
    return isHindi
      ? "📦 Hamare packaging ke baare mein:\n• Eco-friendly biodegradable boxes\n• Tamper-proof seals for safety\n• Temperature-locked packaging\n• Hot food hot rehta hai, cold food cold!\n\nAbout page pe hamare packaging ki full jankari hai."
      : "📦 About our packaging:\n• Eco-friendly biodegradable boxes\n• Tamper-proof seals for safety\n• Temperature-locked packaging\n• Hot food stays hot, cold food stays cold!\n\nFull details about our packaging are on the About page.";

  // Complaint / Feedback
  if (/complaint|feedback|problem|issue|wrong|bad|pathetic|worst/.test(msg))
    return isHindi
      ? "😔 Hume bahut afsos hai ki aapka experience achha nahi raha!\nPlease contact karein:\n• 📞 +91-XXXXXXXXXX\n• 📧 feedback@fastfoodcorner.com\n\nAapki feedback hamare liye bahut important hai. Hum isko zaroor sudhaarenge! 🙏"
      : "😔 We are very sorry that you had a bad experience!\nPlease contact us:\n• 📞 +91-XXXXXXXXXX\n• 📧 feedback@fastfoodcorner.com\n\nYour feedback is very important to us. We will definitely improve! 🙏";

  // Thanks
  if (/thank|thanks|shukriya|dhanyawad|great|awesome|perfect|nice/.test(msg))
    return isHindi
      ? "😊 Bahut shukriya! Koi aur sawaal ho toh zaroor puchho. Fast Food Corner mein aapka swagat hai! 🍔🎉"
      : "😊 Thank you so much! Feel free to ask if you have any more questions. Welcome to Fast Food Corner! 🍔🎉";

  // Bye
  if (/bye|goodbye|alvida|chal|baad mein|later|ok thanks|ok ty/.test(msg))
    return isHindi
      ? "👋 Phir milenge! Fast Food Corner pe aapka intezaar rahega. Khana khao, khush raho! 😄🍕"
      : "👋 See you again! We'll be waiting for you at Fast Food Corner. Eat well, be happy! 😄🍕";

  // Default fallback
  return isHindi
    ? "🤔 Samjha nahi! Aap yeh pooch sakte hain:\n• Menu kya hai?\n• Delivery kaise hoti hai?\n• Table book karna hai\n• Opening hours\n• Payment methods\n• Offers & discounts\n\nKoi bhi sawaal type karein! 😊"
    : "🤔 I didn't quite get that! You can ask me about:\n• What's on the menu?\n• How does delivery work?\n• I want to book a table\n• Opening hours\n• Payment methods\n• Offers & discounts\n\nType any question! 😊";
};

// ===== Quick Reply Suggestions =====
const QUICK_REPLIES = [
  "🕙 Opening Hours",
  "🍽️ What's on the menu?",
  "🛵 Delivery info",
  "📅 Book a Table",
  "💳 Payment methods",
  "🎉 Any offers?",
  "📍 Location",
];

export default function ChatBotButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hello! I am the Fast Food Corner AI assistant.\n\nAsk me about our menu, delivery, bookings, or anything else — I am here to help 24/7! 🍔",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    const userMsg = { from: "user", text: userText, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botReply = getBotReply(userText);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: botReply, time: new Date() },
      ]);
      setTyping(false);
    }, 800);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (d) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div>
              <div className="chatbot-name">Fast Food Assistant</div>
              <div className="chatbot-status">● Online — Always here to help</div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg-row ${msg.from}`}>
                {msg.from === "bot" && <div className="bot-icon">🤖</div>}
                <div className="chat-bubble-wrap">
                  <div className={`chat-bubble ${msg.from}`}>
                    {msg.text.split("\n").map((line, j) => (
                      <span key={j}>
                        {line
                          .split(/(\*\*[^*]+\*\*)/)
                          .map((part, k) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                              <strong key={k}>{part.slice(2, -2)}</strong>
                            ) : (
                              part
                            )
                          )}
                        {j < msg.text.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <div className="chat-time">{formatTime(msg.time)}</div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="chat-msg-row bot">
                <div className="bot-icon">🤖</div>
                <div className="chat-bubble bot typing-bubble">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div className="chatbot-quick-replies">
            {QUICK_REPLIES.map((q) => (
              <button key={q} className="quick-reply-btn" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button
              className="chatbot-send"
              onClick={() => sendMessage()}
              disabled={!input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button className={`chat-fab ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        {open ? (
          "✕"
        ) : (
          <>
            <span style={{ fontSize: "1.4rem" }}>🤖</span>
            <span style={{ fontSize: "1rem", fontWeight: "600", paddingRight: "2px" }}>Chat with us</span>
          </>
        )}
        {!open && <span className="chat-fab-pulse" />}
      </button>
    </>
  );
}