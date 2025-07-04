import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./ScanUpload.css";

const ScanUpload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [credits, setCredits] = useState(0);
  const [username, setUsername] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const { data } = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(data.name);
        setCredits(data.credits);
      } catch (err) {
        setError("Failed to load profile. Please log in again.");
        navigate("/login");
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const validateFileType = (file) => {
    const allowedTypes = [".jpg", ".png", ".jpeg", ".txt"];
    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    return allowedTypes.includes(extension);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    if (!validateFileType(file)) {
      setError("Only .jpg, .png, .jpeg, or .txt files are supported.");
      return;
    }

    if (credits < 1) {
      setError("Insufficient credits. Request more credits to continue.");
      return;
    }

    setIsLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const { data } = await axios.post("http://localhost:5000/api/scan", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setText(data.textContent || data.text || "");
      setCredits(data.credits || 0);
      setMatches(data.matches || []);
    } catch (err) {
      setError(err.response?.data?.error || "Error scanning document.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="scan-container">
      <div className="scan-card">
        <h2 className="scan-title">Welcome, {username || "User"}!</h2>
        <p className="scan-subtext">Scan Documents & Find Matches</p>
        <p className="scan-description">
          Upload an image (.jpg, .png, .jpeg) or text file (.txt) to extract content using OCR or direct text extraction. Each scan costs <strong>1 credit</strong>. You have <strong>{credits}</strong> credits remaining.{" "}
          <Link to="/credits/request" className="credit-link">Need more credits?</Link>
        </p>
        <form className="scan-form" aria-label="Document scan form">
          <div className="input-group">
            <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V5a2 2 0 012-2h14a2 2 0 012 2v7a4 4 0 01-4 4H7zm0 0l-4 4m4-4l4 4"></path>
            </svg>
            <input
              type="file"
              className="scan-input"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".jpg,.png,.jpeg,.txt"
              aria-label="Upload document"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            type="button"
            className="scan-button"
            onClick={handleUpload}
            disabled={isLoading || credits < 1}
            aria-label={isLoading ? "Scanning..." : "Scan document"}
          >
            {isLoading ? "Scanning..." : "Scan Document"}
          </button>
        </form>

        {text && (
          <div className="result-container">
            <h3>Scanned Text</h3>
            <div className="scanned-text" aria-label="Scanned text output">
              <p>{text}</p>
            </div>
            <p className="credits-info">Remaining Credits: {credits}</p>

            {matches.length > 0 && (
              <div className="matches-container">
                <h3>Similar Documents</h3>
                <ul className="matches-list">
                  {matches.map((match) => (
                    <li key={match.docId}>
                      Document ID: {match.docId} (Similarity: {(match.similarity * 100).toFixed(2)}%)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="scan-actions">
          <button
            className="logout-button"
            onClick={handleLogout}
            aria-label="Log out"
          >
            Log Out
          </button>
          <Link to="/credits/request" className="credit-link" aria-label="Request more credits">
            Request Credits
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScanUpload;
