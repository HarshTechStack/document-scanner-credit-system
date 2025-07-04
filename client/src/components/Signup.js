import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Minimum 8 characters
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter a valid username.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Your DocScan Account</h2>
        <p className="signup-subtext">Sign up to start scanning and matching documents</p>
        <form onSubmit={handleSignup} className="signup-form" aria-label="Signup form">
          <div className="input-group">
            <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="signup-input"
              aria-label="Username"
            />
          </div>

          <div className="input-group">
            <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              ></path>
            </svg>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signup-input"
              aria-label="Email address"
            />
          </div>

          <div className="input-group">
            <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zM16 20H8v-2a4 4 0 014-4 4 4 0 014 4v2z"
              ></path>
            </svg>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="signup-input"
              aria-label="Password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="signup-button"
            disabled={isLoading}
            aria-label={isLoading ? "Signing up..." : "Sign up"}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="signup-options">
          <Link to="/login" className="signup-link" aria-label="Log in to existing account">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
