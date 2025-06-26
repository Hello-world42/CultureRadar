import React, { useEffect, useState } from "react";
import eventservice from "../services/eventService";
import EventCard from "../components/EventCard";

const Home = ({ user }) => {
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
      <h2 style={{ marginTop: "30px", marginBottom: "40px" }}>Catalogue de events</h2>
      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-4 mb-3 d-flex">
            <EventCard event={event} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;