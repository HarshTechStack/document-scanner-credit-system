import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to DocScan</h1>
        <p className="home-subtitle">
          Your All-in-One Document Scanning and Matching Solution
        </p>
        <p className="home-description">
          Effortlessly scan images or text files, extract content with OCR, and discover similar documents using advanced matching algorithms. Get started with 20 free daily scans and request additional credits as needed.
        </p>
        <div className="home-buttons">
          <Link to="/login" aria-label="Log in to your account">
            <button className="home-btn login-btn">Log In</button>
          </Link>
          <Link to="/signup" aria-label="Create a new account">
            <button className="home-btn signup-btn">Sign Up</button>
          </Link>
        </div>
        <div className="home-features">
          <div className="feature-item">
            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zM16 20H8v-2a4 4 0 014-4 4 4 0 014 4v2z"></path>
            </svg>
            <h3>Secure Scanning</h3>
            <p>Upload images or text files with confidence using our secure platform.</p>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg>
            <h3>Smart Matching</h3>
            <p>Find similar documents with Levenshtein-based or AI-enhanced matching.</p>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path>
            </svg>
            <h3>Credit System</h3>
            <p>Enjoy 20 free daily scans, with easy credit requests for more.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;