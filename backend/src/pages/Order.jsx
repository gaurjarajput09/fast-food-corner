import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const total = localStorage.getItem("total") || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, phone, address } = form;

        const orderId = "ORD" + Date.now();

        const itemsText = cartItems
            .map((item) => `🍔 ${item.name} x ${item.qty || 1}`)
            .join("\n");

        const orderData = {
            orderId,
            name,
            phone,
            address,
            items: cartItems,
            totalPrice: total,
        };

        await axios.post("https://fast-food-corner-backend.onrender.com/api/orders/place", orderData);

        const message = `
🧾 NEW ORDER RECEIVED

🆔 Order ID: ${orderId}

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

🛒 Items:
${itemsText}

💰 Total: ₹${total}

🕒 Time: ${new Date().toLocaleString()}
`;

        const whatsappNumber = "916265935663";

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
        )}`;

        window.open(url, "_blank");

        navigate("/success");
    };

    return (
        <div className="order-container">
            <h2>Delivery Details</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={form.name}
                    placeholder="Enter Name"
                    onChange={handleChange}
                    required
                />

                <input
                    name="phone"
                    value={form.phone}
                    placeholder="Enter Phone"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="address"
                    value={form.address}
                    placeholder="Enter Address"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Order;