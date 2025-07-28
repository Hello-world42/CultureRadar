import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import eventService from "../services/eventService";

const options = ["Mode", "Musique", "Théatre"];

export default function RegisterStep2({ userData, setUserData, setErrors, errors }) {
  const [selected, setSelected] = useState(userData.preferences || []);
  const navigate = useNavigate();

  const handleCheck = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (selected.length === 0) {
      setErrors({ global: "Veuillez sélectionner au moins une préférence." });
      return;
    }
    try {
      await authService.register({ ...userData, preferences: selected });
    } catch (error) {
      setErrors({ global: error.msg || "Erreur lors de l'inscription" });
      return;
    }
    try {
      await eventService.createEvent({
        author: userData.username,
        genres: selected,
      });
    } catch (error) {}
    navigate("/check-email");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Préférences</h2>
      {options.map((opt) => (
        <div key={opt} className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id={opt}
            checked={selected.includes(opt)}
            onChange={() => handleCheck(opt)}
          />
          <label className="form-check-label" htmlFor={opt}>
            {opt}
          </label>
        </div>
      ))}
      <button className="btn btn-primary w-100" type="submit">
        Valider
      </button>
      {errors.global && (
        <div style={{ color: "red", fontSize: "0.9em", marginTop: 10 }}>
          {errors.global}
        </div>
      )}
    </form>
  );
}