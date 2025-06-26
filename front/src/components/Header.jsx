import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

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
          <ul className="list-unstyled d-flex m-0">
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
                <li className="me-3" >
                  <Link to="/profile" className="text-white text-decoration-none">
                    Profil
                  </Link>
                </li>
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
