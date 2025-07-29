import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import eventservice from "../services/eventService";

const Addevent = ({ user }) => {
  const navigate = useNavigate();

  const [event, setevent] = useState({
    title: "",
    date_debut: "",
    date_fin: "",
    description: "",
    cover_image: "",
  });
  const [allGenres, setAllGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    eventservice.getAllGenres().then(setAllGenres);
  }, []);

  const handleChange = (e) => {
    setevent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await eventservice.createevent({
        title: event.title,
        author: user.username,
        genres,
        description: event.description,
        cover_image: event.cover_image,
        date_debut: event.date_debut,
        date_fin: event.date_fin,
      });
      navigate("/");
    } catch (error) {
      alert("Erreur lors de l'ajout du event.");
    }
  };

  return (
    <div>
      <h2>Ajouter un nouvel événement</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="title"
          placeholder="Titre"
          onChange={handleChange}
          required
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
        <div className="mb-2">
          <label>
            <strong>Genres :</strong>
          </label>
          {allGenres.map((g) => (
            <div key={g} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={g}
                checked={genres.includes(g)}
                onChange={() =>
                  setGenres((genres) =>
                    genres.includes(g)
                      ? genres.filter((x) => x !== g)
                      : [...genres, g]
                  )
                }
              />
              <label className="form-check-label" htmlFor={g}>
                {g}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default Addevent;
