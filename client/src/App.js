import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ScanUpload from "./components/ScanUpload";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/scan" element={token ? <ScanUpload /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
