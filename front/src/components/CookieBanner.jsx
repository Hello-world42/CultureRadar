import React, { useEffect, useState } from "react";

const STORAGE_KEY = "mock_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 2000,
        background: "#fff",
        color: "#1f2b3d",
        border: "1px solid #dbe6ff",
        borderRadius: 12,
        boxShadow: "0 14px 30px rgba(0,0,0,0.25)",
        padding: "1rem",
      }}
      role="dialog"
      aria-label="Bandeau cookies"
    >
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div style={{ textAlign: "left" }}>
          <strong>Gestion des cookies</strong>
          <div style={{ marginTop: 4 }}>
            Nous utilisons des cookies pour améliorer votre expérience, mesurer l'audience et personnaliser certains contenus.
          </div>
        </div>
        <div className="d-flex gap-2" style={{ flexShrink: 0 }}>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => handleChoice("refused")}>
            Refuser
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => handleChoice("accepted")}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
