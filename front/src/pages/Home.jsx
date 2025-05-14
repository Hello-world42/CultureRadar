import React, { useEffect, useState } from "react";
import eventservice from "../services/eventService";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setevents] = useState([]);

  useEffect(() => {
    const fetchevents = async () => {
      try {
        const data = await eventservice.getAllevents();
        setevents(data);
      } catch (error) {
        console.error("Erreur chargement des events :", error);
      }
    };

    fetchevents();
  }, []);

  return (
    <div>
      <h2>Catalogue de events</h2>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Home;
