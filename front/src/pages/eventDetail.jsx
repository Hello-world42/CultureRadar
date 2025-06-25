import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { geteventById } from "../services/eventService";
import eventservice from "../services/eventService";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    eventservice.geteventById(id)
      .then(setEvent)
      .catch(() => setError("Événement introuvable"));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Chargement...</p>;

  return (
    <div className="card mx-auto" style={{ maxWidth: "600px" }}>
      {event.cover_image && (
        <img
          src={event.cover_image}
          alt={event.title}
          className="card-img-top"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p className="card-text"><strong>Auteur :</strong> {event.author}</p>
        <p className="card-text"><strong>Genre :</strong> {event.genre}</p>
        <p className="card-text">
          <strong>Date :</strong>{" "}
          {event.date_fin
            ? <>Du {event.date_debut} au {event.date_fin}</>
            : <>Le {event.date_debut}</>
          }
        </p>
        <p className="card-text" style={{ textAlign: "justify" }}>
          <strong>Description :</strong> {event.description}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;