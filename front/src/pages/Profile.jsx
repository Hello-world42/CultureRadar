import React, { useState } from "react";
import authService from "../services/authService";

const Profile = ({ user }) => {
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [editPrefs, setEditPrefs] = useState(false);
  const allOptions = ["Mode", "Musique", "Théatre"];
  const [prefs, setPrefs] = useState(user.preferences ? user.preferences.split(",") : []);
  const [prefsError, setPrefsError] = useState("");

  if (!user) return <p>Chargement du profil...</p>;

  console.log("USER DANS PROFILE :", user);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    if (newPassword !== confirm) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await authService.changePassword(newPassword);
      setMessage("Mot de passe modifié !");
      setShowReset(false);
      setNewPassword("");
      setConfirm("");
    } catch {
      setMessage("Erreur lors de la modification.");
    }
  };

  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h3 className="card-title mb-4">Profil</h3>
        <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p>
          <strong>Préférences :</strong>{" "}
          {user.preferences
            ? user.preferences.split(",").join(", ")
            : <span style={{ color: "#888" }}>Aucune</span>}
        </p>
        <button
          className="btn btn-outline-secondary btn-sm mb-3"
          onClick={() => setEditPrefs(true)}
        >
          Changer mes préférences
        </button>
        {editPrefs && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setPrefsError("");
              if (prefs.length === 0) {
                setPrefsError("Veuillez sélectionner au moins une préférence.");
                return;
              }
              try {
                await authService.updatePreferences(prefs);
                setEditPrefs(false);
                window.location.reload();
              } catch {
                setPrefsError("Erreur lors de la mise à jour.");
              }
            }}
            className="mb-3"
          >
            <div className="mb-2">
              {allOptions.map(opt => (
                <div key={opt} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={opt}
                    checked={prefs.includes(opt)}
                    onChange={() => {
                      setPrefsError("");
                      setPrefs(prefs =>
                        prefs.includes(opt)
                          ? prefs.length > 1 ? prefs.filter(o => o !== opt) : prefs
                          : [...prefs, opt]
                      );
                    }}
                  />
                  <label className="form-check-label" htmlFor={opt}>{opt}</label>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-sm" type="submit">
              Enregistrer
            </button>
            <button
              type="button"
              className="btn btn-link btn-sm"
              onClick={() => setEditPrefs(false)}
            >
              Annuler
            </button>
            {prefsError && <div className="text-danger mt-2">{prefsError}</div>}
          </form>
        )}
        <p>
          <strong>Mot de passe :</strong>{" "}
          <input type="password" value="password" disabled style={{ width: "120px" }} />
        </p>
        <button
          className="btn btn-outline-primary btn-sm mb-3"
          onClick={() => setShowReset((v) => !v)}
        >
          Réinitialiser le mot de passe
        </button>
        {showReset && (
          <form onSubmit={handleReset}>
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Confirmer le mot de passe"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
            <button className="btn btn-primary btn-sm" type="submit">
              Valider
            </button>
          </form>
        )}
        {message && <div className="mt-2 text-danger">{message}</div>}
        {user.events_participated && user.events_participated.length > 0 && (
          <p>
            <strong>Événements :</strong>{" "}
            {user.events_participated.map(ev => ev.title).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;