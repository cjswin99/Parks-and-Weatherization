import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage: React.FC = () => {
  const { register, login, logout, user } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log(isNewUser ? "Registering..." : "Logging in...");
      if (isNewUser) {
        await register(username, email, password);
      } else {
        await login(username, email, password);
      }

      navigate("/park");
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to Parks and Weather</h1>
      <p className="description">
        {user ? `Welcome back, ${user}!` : "Enter your details below to sign up or log in."}
      </p>

      {error && <p className="error">{error}</p>}

      {!user ? (
        <div className="login-container">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleSubmit} className="login-button" disabled={loading}>
            {loading ? "Processing..." : isNewUser ? "Sign Up" : "Log In"}
          </button>
          <p onClick={() => setIsNewUser(!isNewUser)} className="toggle-link">
            {isNewUser ? "Already have an account? Log in" : "Don't have an account? Sign up"}
          </p>
        </div>
      ) : (
        <div className="logged-in-container">
          <p>Welcome back, {user}!</p>
          <button onClick={() => navigate("/park")} className="navigate-button">
            Go to Park Search
          </button>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
