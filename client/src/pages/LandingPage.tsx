import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// Use a namespace import for jwt-decode because of Vite issues:
import * as jwt_decode from "jwt-decode";

interface JwtPayload {
  exp?: number;
  [key: string]: any;
}

const LandingPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { login, user } = authContext;

  const handleLogin = async () => {
    // Validate that all fields are provided.
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Call the login function (which should store the JWT in localStorage).
      await login(username, email, password);
      setLoading(false);

      // Retrieve the token from localStorage.
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token received. Login failed.");
        return;
      }

      // Decode and verify the token.
      try {
        // Use the namespace import workaround.
        const decodeFn = jwt_decode as unknown as (token: string) => JwtPayload;
        const decoded = decodeFn(token);
        // Optionally, check for token expiration.
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          setError("Token has expired. Please log in again.");
          return;
        }
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        setError("Invalid token received.");
        return;
      }

      console.log("Login successful, token verified. Redirecting to /parks");
      navigate("/parks");
    } catch (err) {
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to Parks and Weather</h1>
      <p className="description">
        Enter your details below to sign up and search for parks.
      </p>

      {error && <p className="error">{error}</p>}

      {/* Show the login form if not logged in */}
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
          <button onClick={handleLogin} className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Sign Up"}
          </button>
        </div>
      ) : (
        <p>Welcome, {user}!</p>
      )}
    </div>
  );
};

export default LandingPage;
