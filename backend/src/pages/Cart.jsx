// import React from "react";

// const Cart = ({ cart, removeFromCart, setCart }) => {
//   const getTotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.qty, 0);
//   };

//   const increaseQty = (id) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id ? { ...item, qty: item.qty + 1 } : item
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id && item.qty > 1
//           ? { ...item, qty: item.qty - 1 }
//           : item
//       )
//     );
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="text-center mb-4">🛒 Your Cart</h2>

//       {cart.length === 0 ? (
//         <h4 className="text-center">Cart is Empty 😢</h4>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="d-flex justify-content-between align-items-center border p-3 mb-2"
//             >
//               <div>
//                 <h5>{item.name}</h5>
//                 <p>₹ {item.price}</p>
//               </div>

//               <div>
//                 <button
//                   className="btn btn-sm btn-secondary mx-1"
//                   onClick={() => decreaseQty(item.id)}
//                 >
//                   -
//                 </button>

//                 <span>{item.qty}</span>

//                 <button
//                   className="btn btn-sm btn-secondary mx-1"
//                   onClick={() => increaseQty(item.id)}
//                 >
//                   +
//                 </button>
//               </div>

//               <h6>₹ {item.price * item.qty}</h6>

//               <button
//                 className="btn btn-danger"
//                 onClick={() => removeFromCart(item.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <hr />

//           <h3 className="text-end">
//             Total: ₹ {getTotal()}
//           </h3>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useState } from "react";

const Cart = ({ cart, removeFromCart, setCart }) => {
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  };

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // 📲 WhatsApp Order
  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    const phoneNumber = "916265935663";
    const orderId = "ORD" + Date.now();
    const time = new Date().toLocaleString();

    const items = cart
      .map(
        (item) =>
          `🍔 ${item.name} x ${item.qty} = ₹${item.price * item.qty}`
      )
      .join("\n");

    const message = `
🍔 NEW ORDER

🆔 ${orderId}
👤 Name: ${customerName}
📧 Email: ${customerEmail}
📍 Address: ${customerAddress}

${items}

💰 Total: ₹${getTotal()}

⏰ ${time}
    `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <h4 className="text-center">Cart is Empty 😢</h4>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center border p-3 mb-2"
            >
              <div>
                <h5>{item.name}</h5>
                <p>₹{item.price}</p>
              </div>

              <div>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <h6>₹{item.price * item.qty}</h6>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <hr />

          <h3 className="text-end">Total: ₹{getTotal()}</h3>

          {/* 🔥 ORDER BUTTON FIXED */}
          <div className="d-flex flex-column align-items-end mt-3">
            <h5 className="mb-3">Delivery Details</h5>
            <input 
              type="text" 
              className="form-control mb-2" 
              style={{ maxWidth: "300px", width: "100%" }}
              placeholder="Enter your name" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input 
              type="email" 
              className="form-control mb-2" 
              style={{ maxWidth: "300px", width: "100%" }}
              placeholder="Enter your email" 
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <textarea 
              className="form-control mb-3" 
              style={{ maxWidth: "300px", width: "100%" }}
              placeholder="Enter your full address" 
              rows="3"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
            
            <button
              className="btn btn-success"
              onClick={sendOrderToWhatsApp}
              disabled={!customerName.trim() || !customerEmail.trim() || !customerAddress.trim()}
            >
              🛒 Place Order
            </button>
            {(!customerName.trim() || !customerEmail.trim() || !customerAddress.trim()) && (
              <small className="text-danger mt-1">Please fill all details to place order</small>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;