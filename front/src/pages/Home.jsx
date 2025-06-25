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
      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-4 mb-4 d-flex">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;