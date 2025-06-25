import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventservice from "../services/eventService";

const Addevent = () => {
  const navigate = useNavigate();
  const [event, setevent] = useState({
    title: "",
    author: "",
    genre: "",
    date_debut: "",
    date_fin: "",
    description: "",
    cover_image: "",
  });

  const handleChange = (e) => {
    setevent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await eventservice.createevent(event);
      navigate("/");
    } catch (error) {
      alert("Erreur lors de l'ajout du event.");
    }
  };

  return (
    <div>
      <h2>Ajouter un nouveau event</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="title"
          placeholder="Titre"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="author"
          placeholder="Auteur"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="genre"
          placeholder="Genre"
          onChange={handleChange}
        />
        <input
          type="date"
          className="form-control mb-2"
          name="date_debut"
          value={event.date_debut}
          onChange={handleChange}
        />
        <input
          type="date"
          className="form-control mb-2"
          name="date_fin"
          value={event.date_fin}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="cover_image"
          placeholder="URL de la couverture"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default Addevent;
