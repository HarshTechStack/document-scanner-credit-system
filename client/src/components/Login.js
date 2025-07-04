import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token } = data;

      // Save token and optionally user info
      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(data));
      }

      // Set token in app state (if managed via context or props)
      setToken(token);

      // Redirect to scan/dashboard
      navigate("/scan");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Invalid credentials. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Log In to DocScan</h2>
        <p className="login-subtext">Access your documents and start scanning</p>
        <form onSubmit={handleLogin} className="login-form" aria-label="Login form">
          <div className="input-group">
            <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
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
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              aria-label="Password"
            />
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              aria-label="Remember me"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
            aria-label={isLoading ? "Logging in..." : "Log in"}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="login-options">
          <Link to="/signup" className="login-link" aria-label="Create a new account">
            Create an account
          </Link>
          <button
            className="login-link forgot-password"
            onClick={() => alert("Forgot password feature coming soon!")}
            aria-label="Forgot password"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
