import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="card mb-3 shadow-sm">
      {event.cover_image && (
        <img
          src={event.cover_image}
          alt={event.title}
          className="card-img-top"
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">Auteur : {event.author}</p>
        <p className="card-text">Date : {event.date}</p>
        <Link to={`/events/${event.id}`} className="btn btn-primary">
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default EventCard;