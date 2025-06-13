import React, { useState, useEffect } from "react";

const SessionStorageTest = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("login");

  const defaultLogoUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png";

  useEffect(() => {
    // On mount, check sessionStorage for token
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }

    // On mount, check sessionStorage for logo URL
    const savedLogoUrl = sessionStorage.getItem("logoUrl");
    if (savedLogoUrl) {
      setLogoUrl(savedLogoUrl);
    } else {
      // If not present, set default logo URL and save to sessionStorage
      setLogoUrl(defaultLogoUrl);
      sessionStorage.setItem("logoUrl", defaultLogoUrl);
    }

    // On mount, check sessionStorage for active tab
    const savedTab = sessionStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleLogin = () => {
    // Simulate login and save token to sessionStorage
    const fakeToken = "123456789abcdef";
    sessionStorage.setItem("token", fakeToken);
    setToken(fakeToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear token from sessionStorage
    sessionStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    sessionStorage.setItem("activeTab", tab);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>SessionStorage Login Test</h2>
      {logoUrl && (
        <img
          src={logoUrl}
          alt="Logo"
          style={{ width: "200px", height: "auto", marginBottom: "20px" }}
        />
      )}

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleTabChange("login")}
          style={{
            marginRight: "10px",
            backgroundColor: activeTab === "login" ? "#007bff" : "#ccc",
            color: activeTab === "login" ? "white" : "black",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <button
          onClick={() => handleTabChange("info")}
          style={{
            backgroundColor: activeTab === "info" ? "#007bff" : "#ccc",
            color: activeTab === "info" ? "white" : "black",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Info
        </button>
      </div>

      {activeTab === "login" && (
        <>
          {isLoggedIn ? (
            <>
              <p>Logged in with token:</p>
              <code>{token}</code>
              <br />
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <p>You are not logged in.</p>
              <button onClick={handleLogin}>Login</button>
            </>
          )}
        </>
      )}

      {activeTab === "info" && (
        <div>
          <p>This is the Info tab content.</p>
          <p>You can add any other content here.</p>
        </div>
      )}
    </div>
  );
};

export default SessionStorageTest;
