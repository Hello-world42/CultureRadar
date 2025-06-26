import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import Profile from "./pages/Profile";
import Addevent from "./pages/Addevent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import authService from "./services/authService";
import RequireAuth from "./components/RequireAuth";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService
        .me()
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false)); // Fin du chargement
    } else {
      setLoading(false); // Pas de token, fin du chargement
    }
  }, []);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (loading) {
    return <div>Chargement...</div>; // Ou un spinner
  }

  return (
    <div className="App">
      {!isAuthPage && user && <Header user={user} setUser={setUser} />}
      <main className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          {/* Toutes les routes privées */}
          <Route
            path="/"
            element={
              <RequireAuth user={user}>
                <Home user={user} />
              </RequireAuth>
            }
          />
          <Route
            path="/events/:id"
            element={
              <RequireAuth user={user}>
                <EventDetail user={user} />
              </RequireAuth>
            }
          />
          <Route
            path="/add-event"
            element={
              <RequireAuth user={user}>
                <Addevent />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth user={user}>
                <Profile user={user} />
              </RequireAuth>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {!isAuthPage && user && <Footer />}
    </div>
  );
}

export default App;
