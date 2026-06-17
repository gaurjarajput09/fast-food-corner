import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stats");
  const [stats, setStats] = useState({ users: 0, orders: 0, bookings: 0, messages: 0 });
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [whatsappLogs, setWhatsappLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const adminEmail = "fastfoodinfo00@gmail.com";

  // Security Check: Redirect if not logged in or not admin
  useEffect(() => {
    if (!user || user.email !== adminEmail) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchAdminData = async () => {
    setLoading(true);
    setError("");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch stats always
      const statsRes = await fetch(`${API_BASE_URL}/api/admin/stats`, { headers });
      if (!statsRes.ok) throw new Error("Failed to fetch admin stats");
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch active tab specific data
      if (activeTab === "users") {
        const res = await fetch(`${API_BASE_URL}/api/admin/users`, { headers });
        const data = await res.json();
        setUsers(data);
      } else if (activeTab === "orders") {
        const res = await fetch(`${API_BASE_URL}/api/admin/orders`, { headers });
        const data = await res.json();
        setOrders(data);
      } else if (activeTab === "bookings") {
        const res = await fetch(`${API_BASE_URL}/api/admin/bookings`, { headers });
        const data = await res.json();
        setBookings(data);
      } else if (activeTab === "whatsapp") {
        const res = await fetch(`${API_BASE_URL}/api/admin/whatsapp-logs`, { headers });
        const data = await res.json();
        setWhatsappLogs(data);
      }
    } catch (err) {
      setError(err.message || "Something went wrong fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.email === adminEmail) {
      fetchAdminData();
    }
  }, [activeTab, user]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        // refresh orders list
        fetchAdminData();
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (!user || user.email !== adminEmail) {
    return null;
  }

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <div className="admin-hero-content">
          <span className="admin-hero-badge">🛡️ Owner Control Panel</span>
          <h1>Admin Dashboard</h1>
          <p>Real-time analytics and management for Fast Food Corner</p>
        </div>
      </div>

      <div className="container admin-container-wrap">
        {/* Stat Cards Grid */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card" onClick={() => setActiveTab("users")}>
            <div className="admin-stat-icon">👥</div>
            <div>
              <h3>{stats.users}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="admin-stat-card" onClick={() => setActiveTab("orders")}>
            <div className="admin-stat-icon">🍔</div>
            <div>
              <h3>{stats.orders}</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="admin-stat-card" onClick={() => setActiveTab("bookings")}>
            <div className="admin-stat-icon">📅</div>
            <div>
              <h3>{stats.bookings}</h3>
              <p>Table Bookings</p>
            </div>
          </div>
          <div className="admin-stat-card" onClick={() => setActiveTab("whatsapp")}>
            <div className="admin-stat-icon">💬</div>
            <div>
              <h3>{stats.messages}</h3>
              <p>WhatsApp Logs</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === "stats" ? "active" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            📊 Overview
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Registered Users
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            🍔 Orders List
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            📅 Bookings
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "whatsapp" ? "active" : ""}`}
            onClick={() => setActiveTab("whatsapp")}
          >
            💬 WhatsApp Chats
          </button>
        </div>

        {/* Error Notification */}
        {error && <div className="admin-error-box">⚠️ {error}</div>}

        {/* Content Box */}
        <div className="admin-content-card">
          {loading ? (
            <div className="admin-loader-wrap">
              <div className="admin-spinner"></div>
              <p>Loading analytics...</p>
            </div>
          ) : (
            <>
              {/* Tab 1: Stats Overview */}
              {activeTab === "stats" && (
                <div className="admin-overview-tab">
                  <h2>Live Business Metrics</h2>
                  <div className="row g-4 mt-2">
                    <div className="col-md-6">
                      <div className="overview-subcard">
                        <h4>Platform Users</h4>
                        <p>Customers registered using their email address to login/signup. Enables direct customer profile records.</p>
                        <button className="btn btn-outline-warning btn-sm" onClick={() => setActiveTab("users")}>View Customers →</button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="overview-subcard">
                        <h4>Order Placements</h4>
                        <p>All checkout orders successfully submitted by users. Orders are stored in database and routed to WhatsApp.</p>
                        <button className="btn btn-outline-warning btn-sm" onClick={() => setActiveTab("orders")}>Manage Orders →</button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="overview-subcard">
                        <h4>Table Bookings</h4>
                        <p>Real-time booking slots requested by customers. Helps manage restaurant reservations and seat allocations.</p>
                        <button className="btn btn-outline-warning btn-sm" onClick={() => setActiveTab("bookings")}>View Bookings →</button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="overview-subcard">
                        <h4>WhatsApp Log System</h4>
                        <p>All automated messages sent to customers and notifications received by owners, plus chatbot chats.</p>
                        <button className="btn btn-outline-warning btn-sm" onClick={() => setActiveTab("whatsapp")}>Inspect Chats →</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Users List */}
              {activeTab === "users" && (
                <div className="admin-table-wrap">
                  <h2>Registered Customers</h2>
                  {users.length === 0 ? (
                    <p className="no-data">No registered users found.</p>
                  ) : (
                    <table className="table admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email Address</th>
                          <th>Joined On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u._id}>
                            <td className="fw-bold text-white">{u.name}</td>
                            <td>{u.email}</td>
                            <td>{new Date(u.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Tab 3: Orders Management */}
              {activeTab === "orders" && (
                <div className="admin-table-wrap">
                  <h2>Recent Orders</h2>
                  {orders.length === 0 ? (
                    <p className="no-data">No orders recorded in database yet.</p>
                  ) : (
                    <table className="table admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer Details</th>
                          <th>Items</th>
                          <th>Total Price</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o._id}>
                            <td className="text-warning fw-bold">{o.orderId}</td>
                            <td>
                              <div><strong>{o.name}</strong></div>
                              <div className="text-muted small">{o.phone}</div>
                              <div className="text-muted small" style={{ maxWidth: "200px" }}>{o.address}</div>
                            </td>
                            <td>
                              {o.items && o.items.map((it, idx) => (
                                <div key={idx} className="small text-white-50">
                                  🍔 {it.name} <span className="text-warning">x{it.qty}</span>
                                </div>
                              ))}
                            </td>
                            <td className="fw-bold">₹{o.totalPrice}</td>
                            <td>
                              <select
                                className="form-select form-select-sm admin-status-select"
                                value={o.status}
                                onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td>{new Date(o.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Tab 4: Table Bookings */}
              {activeTab === "bookings" && (
                <div className="admin-table-wrap">
                  <h2>Restaurant Table Bookings</h2>
                  {bookings.length === 0 ? (
                    <p className="no-data">No bookings requested.</p>
                  ) : (
                    <table className="table admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Guests</th>
                          <th>Date & Time</th>
                          <th>Message</th>
                          <th>Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b._id}>
                            <td className="fw-bold text-white">{b.name}</td>
                            <td>{b.phone}</td>
                            <td className="text-center text-warning fw-bold">{b.guests}</td>
                            <td>{b.date} {b.time ? `@ ${b.time}` : ""}</td>
                            <td style={{ maxWidth: "200px" }}>{b.message || "-"}</td>
                            <td>{new Date(b.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Tab 5: WhatsApp Chat Logs */}
              {activeTab === "whatsapp" && (
                <div className="admin-table-wrap">
                  <h2>WhatsApp Chat Logs</h2>
                  {whatsappLogs.length === 0 ? (
                    <p className="no-data">No WhatsApp messages logged.</p>
                  ) : (
                    <table className="table admin-table">
                      <thead>
                        <tr>
                          <th>Direction</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Message Body</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {whatsappLogs.map((l) => (
                          <tr key={l._id}>
                            <td>
                              <span className={`badge ${l.direction === "incoming" ? "bg-success" : "bg-info"}`}>
                                {l.direction.toUpperCase()}
                              </span>
                            </td>
                            <td>{l.from}</td>
                            <td>{l.to}</td>
                            <td className="text-white" style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}>
                              {l.body}
                            </td>
                            <td>{new Date(l.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
