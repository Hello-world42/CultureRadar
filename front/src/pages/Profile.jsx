import React, { useState } from "react";
import authService from "../services/authService";

const Profile = ({ user }) => {
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  if (!user) return <p>Chargement du profil...</p>;

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
        <h3 className="card-title mb-4">Mon profil</h3>
        <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
        <p><strong>Email :</strong> {user.email}</p>
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