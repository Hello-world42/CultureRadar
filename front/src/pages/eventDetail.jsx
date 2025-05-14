import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventservice from "../services/eventService";

const eventDetail = () => {
  const { id } = useParams();
  const [event, setevent] = useState(null);

  useEffect(() => {
    eventservice.geteventById(id).then(setevent);
  }, [id]);


  if (!event) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>
        <strong>Auteur :</strong> {event.author}
      </p>
      <p>
        <strong>Description :</strong> {event.description}
      </p>
      <p>
        <strong>Date :</strong> {event.date}
      </p>

    </div>
  );
};

export default eventDetail;
