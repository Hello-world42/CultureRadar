import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventservice from "../services/eventService";

const EventDetail = ({ user }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    eventservice.geteventById(id)
      .then(setEvent)
      .catch(() => setError("Événement introuvable"));
  }, [id]);

  const isParticipating = user?.events_participated?.some(ev => ev.id === Number(id));

  const handleParticipate = async (eventId) => {
    try {
      await eventservice.participate(eventId);
      alert("Participation enregistrée !");
      window.location.reload();
    } catch (e) {
      alert("Erreur lors de la participation.");
    }
  };

  const handleUnparticipate = async (eventId) => {
    try {
      await eventservice.unparticipate(eventId);
      alert("Participation annulée !");
      window.location.reload();
    } catch (e) {
      alert("Erreur lors de l'annulation.");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Chargement...</p>;

  return (
    <div className="card mx-auto d-flex flex-column" style={{ maxWidth: "600px", minWidth: "350px", height: "100%" }}>
      {event.cover_image && (
        <img
          src={event.cover_image}
          alt={event.title}
          className="card-img-top"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
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
        {event.participants && event.participants.length > 0 && (
          <div className="mt-3">
            <strong>Participant(s)&nbsp;:</strong> {event.participants.join(", ")}
          </div>
        )}
        <div className="mt-auto">
          {isParticipating ? (
            <button
              className="btn btn-secondary mt-3 w-100"
              onClick={() => handleUnparticipate(event.id)}
            >
              Je ne participe plus...
            </button>
          ) : (
            <button
              className="btn btn-success mt-3 w-100"
              onClick={() => handleParticipate(event.id)}
            >
              Je participe !
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;