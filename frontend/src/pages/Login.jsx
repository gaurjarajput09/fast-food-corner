import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isSignup ? "/api/auth/register" : "/api/auth/login";
    const body = isSignup
      ? { name, email, password }
      : { email, password };

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // Save token & user info
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: data._id, name: data.name, email: data.email })
      );

      onLogin({ _id: data._id, name: data.name, email: data.email });
      navigate("/");
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Effects */}
      <div className="login-bg-glow login-bg-glow-1"></div>
      <div className="login-bg-glow login-bg-glow-2"></div>

      <div className="login-container">
        {/* Left Side — Branding */}
        <div className="login-brand-side">
          <div className="login-brand-content">
            <span className="login-brand-emoji">🍔</span>
            <h1 className="login-brand-title">
              Fast Food <span className="login-brand-accent">Corner</span>
            </h1>
            <p className="login-brand-tagline">
              Delicious food, delivered fast. Login to track orders, book tables
              & more.
            </p>
            <div className="login-brand-features">
              <div className="login-feature-item">
                <span className="login-feature-icon">🛒</span>
                <span>Order your favourites online</span>
              </div>
              <div className="login-feature-item">
                <span className="login-feature-icon">📅</span>
                <span>Book a table in seconds</span>
              </div>
              <div className="login-feature-item">
                <span className="login-feature-icon">🚀</span>
                <span>Lightning-fast delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side — Form */}
        <div className="login-form-side">
          <div className="login-form-card">
            {/* Toggle Tabs */}
            <div className="login-tabs">
              <button
                className={`login-tab ${!isSignup ? "login-tab-active" : ""}`}
                onClick={() => {
                  setIsSignup(false);
                  setError("");
                }}
              >
                Login
              </button>
              <button
                className={`login-tab ${isSignup ? "login-tab-active" : ""}`}
                onClick={() => {
                  setIsSignup(true);
                  setError("");
                }}
              >
                Sign Up
              </button>
            </div>

            <h2 className="login-form-title">
              {isSignup ? "Create Account" : "Welcome Back"} 👋
            </h2>
            <p className="login-form-subtitle">
              {isSignup
                ? "Sign up to start ordering delicious food!"
                : "Login to your account to continue."}
            </p>

            {/* Error Message */}
            {error && (
              <div className="login-error">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              {/* Name — only for signup */}
              {isSignup && (
                <div className="login-field">
                  <label htmlFor="login-name">Full Name</label>
                  <div className="login-input-wrap">
                    <span className="login-input-icon">👤</span>
                    <input
                      id="login-name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="login-field">
                <label htmlFor="login-email">Email Address</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">✉️</span>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-field">
                <label htmlFor="login-password">Password</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">🔒</span>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="login-spinner"></span>
                ) : isSignup ? (
                  "🚀 Create Account"
                ) : (
                  "🔓 Login"
                )}
              </button>
            </form>

            {/* Bottom Toggle */}
            <p className="login-toggle-text">
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                className="login-toggle-btn"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                }}
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
