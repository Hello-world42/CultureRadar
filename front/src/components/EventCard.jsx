import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="card mb-3 shadow-sm w-100" style={{ height: "400px", display: "flex", flexDirection: "column" }}>
      {event.cover_image && (
        <img
          src={event.cover_image}
          alt={event.title}
          className="card-img-top"
          style={{
            height: "50%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center"
          }}
        />
      )}
      <div className="card-body d-flex flex-column justify-content-between" style={{ height: "50%" }}>
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">Auteur : {event.author}</p>
        <p className="card-text">
          <strong>Date :</strong>{" "}
          {event.date_fin
            ? <>Du {event.date_debut} au {event.date_fin}</>
            : <>Le {event.date_debut}</>
          }
        </p>
        <Link to={`/events/${event.id}`} className="btn btn-primary mt-auto">
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default EventCard;