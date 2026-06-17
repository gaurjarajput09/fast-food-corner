
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBotButton from "./components/ChatBotButton";
import WhatsAppButton from "./components/WhatsAppButton";


import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Booking from "./pages/Booking";
import Order from "./pages/Order";
import Success from "./pages/Success";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  const [cart, setCart] = useState([]);


  // ─── User Auth State ──────────────────────────────
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // ➕ Add to Cart

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i._id === item._id);

      if (existing) {
        return prevCart.map((i) =>
          i._id === item._id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prevCart, { ...item, qty: 1 }];
    });
  };


  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };


  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar cartCount={cart.length} user={user} onLogout={handleLogout} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/booking" element={<Booking />} />

        <Route
          path="/menu"
          element={<Menu addToCart={addToCart} />}
        />

        <Route
         path="/order"
          element={
            <Order
              cartItems={cart}
              total={cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0)}
            />
          }
        />
        <Route path="/success" element={<Success />} />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              setCart={setCart}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminDashboard user={user} />} />

      </Routes>

      <Footer />
      <ChatBotButton />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;