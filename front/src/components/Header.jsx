import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteNotification,
  getNotifications,
  markAsRead,
} from "../services/notificationService";

const Header = ({ user }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const searchTargets = useMemo(
    () => [
      { label: "Ville Nantes", path: "/nantes", keywords: ["nantes", "ville nantes"] },
      { label: "Ville Rennes", path: "/rennes", keywords: ["rennes", "ville rennes"] },
      { label: "Ville Toulouse", path: "/toulouse", keywords: ["toulouse", "ville toulouse"] },
      { label: "Accessibilité", path: "/accessibilite", keywords: ["accessibilite", "pmr", "handicap"] },
      {
        label: "Blog accessibilité global",
        path: "/blog/accessibilite-culture-guide-complet",
        keywords: ["blog", "accessibilite", "guide global"],
      },
      {
        label: "Blog Nantes accessible",
        path: "/blog/sorties-accessibles-nantes-guide-complet",
        keywords: ["blog nantes", "sorties accessibles nantes"],
      },
      {
        label: "Blog Rennes accessible",
        path: "/blog/sorties-accessibles-rennes-guide-complet",
        keywords: ["blog rennes", "sorties accessibles rennes"],
      },
      {
        label: "Blog Toulouse accessible",
        path: "/blog/sorties-accessibles-toulouse-guide-complet",
        keywords: ["blog toulouse", "sorties accessibles toulouse"],
      },
      { label: "Concerts Nantes", path: "/nantes/concerts", keywords: ["concert", "concerts"] },
      { label: "Expositions Nantes", path: "/nantes/expositions", keywords: ["expo", "expositions"] },
      { label: "Théâtre Nantes", path: "/nantes/theatre", keywords: ["theatre", "théâtre"] },
    ],
    []
  );

  const filteredTargets = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) {
      return searchTargets.slice(0, 6);
    }
    return searchTargets
      .filter((item) => {
        const haystack = `${item.label} ${item.keywords.join(" ")}`.toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [searchTargets, searchValue]);

  const goToTarget = (path) => {
    setShowSuggestions(false);
    setSearchValue("");
    navigate(path);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredTargets.length > 0) {
      goToTarget(filteredTargets[0].path);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setNotifications([]);
      return;
    }
    getNotifications().then(setNotifications).catch(() => setNotifications([]));
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1 className="h3 m-0">Capsule Culture</h1>
        </Link>
        <nav>
          <ul className="list-unstyled d-flex m-0" style={{ alignItems: "center" }}>
            <li className="me-3" style={{ position: "relative" }}>
              <form onSubmit={onSearchSubmit} className="d-flex" role="search">
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Recherche: Nantes, concert, blog..."
                  className="form-control form-control-sm"
                  style={{ width: 260 }}
                  aria-label="Recherche pages SEO"
                />
                <button type="submit" className="btn btn-sm btn-outline-light ms-2">
                  Aller
                </button>
              </form>
              {showSuggestions && filteredTargets.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 36,
                    left: 0,
                    width: 320,
                    zIndex: 1100,
                    background: "#fff",
                    color: "#1f2b3d",
                    border: "1px solid #d4dded",
                    borderRadius: 8,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                    overflow: "hidden",
                  }}
                >
                  {filteredTargets.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => goToTarget(item.path)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        background: "transparent",
                        border: "none",
                        padding: "0.55rem 0.7rem",
                        borderBottom: "1px solid #eef3ff",
                        color: "#163055",
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
            <li className="me-3">
              <Link to="/" className="text-white text-decoration-none">
                Accueil
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="me-3">
                  <Link
                    to="/add-event"
                    className="text-white text-decoration-none"
                  >
                    Ajouter un évent
                  </Link>
                </li>
                <li className="me-3">
                  <Link to="/profile" className="text-white text-decoration-none">
                    Profil
                  </Link>
                </li>
                <li className="me-3">
                  <Link to="/mes-evenements" className="nav-link">
                    Mes évènements
                  </Link>
                </li>
                <li className="me-3">
                  <button
                    className="btn btn-link"
                    style={{
                      color: "#fff",
                      fontSize: "1.5em",
                      position: "relative",
                      verticalAlign: "middle",
                      padding: 0,
                      marginTop: 2,
                      height: 32,
                      width: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setShowNotif((v) => !v)}
                    aria-label="Notifications"
                  >
                    <span role="img" aria-label="cloche">
                      🔔
                    </span>
                    {/* Badge nombre de notif non lues */}
                    {notifications.filter((n) => !n.lu).length > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          background: "#d32f2f",
                          color: "#fff",
                          borderRadius: "50%",
                          fontSize: 12,
                          padding: "2px 6px",
                        }}
                      >
                        {notifications.filter((n) => !n.lu).length}
                      </span>
                    )}
                  </button>
                </li>
                {showNotif && (
                  <div
                    style={{
                      position: "absolute",
                      top: 50,
                      right: 20,
                      background: "#fff",
                      color: "#222",
                      borderRadius: 8,
                      boxShadow: "0 2px 8px #0002",
                      minWidth: 320,
                      zIndex: 1000,
                      padding: 16,
                    }}
                  >
                    <h5>Notifications</h5>
                    {notifications.length === 0 ? (
                      <div style={{ color: "#888" }}>Aucune notification</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          style={{
                            marginBottom: 12,
                            fontWeight: n.lu ? 400 : 600,
                            cursor: "pointer",
                            position: "relative",
                          }}
                          onClick={async () => {
                            await markAsRead(n.id);
                            navigate(`/events/${n.event_id}`);
                          }}
                        >
                          {n.message}
                          <button
                            style={{
                              position: "absolute",
                              top: 2,
                              right: 2,
                              background: "#fff",
                              border: "none",
                              borderRadius: "50%",
                              width: 22,
                              height: 22,
                              cursor: "pointer",
                              color: "#d32f2f",
                              fontWeight: "bold",
                              fontSize: 14,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(n.id);
                              setNotifications((notifications) =>
                                notifications.filter((notif) => notif.id !== n.id)
                              );
                            }}
                            aria-label="Supprimer"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline-light"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="me-3">
                  <Link to="/login" className="text-white text-decoration-none">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-white text-decoration-none"
                  >
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
