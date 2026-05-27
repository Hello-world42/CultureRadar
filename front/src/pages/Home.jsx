import React, { useEffect, useState } from "react";
import eventservice from "../services/eventService";
import EventCard from "../components/EventCard";
import EventCarousel from "../components/EventCarousel";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [events, setevents] = useState([]);
  const [distance, setDistance] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchevents = async () => {
      try {
        let data;
        if (user) {
          data = await eventservice.getAllevents(distance, page, 30);
        } else {
          try {
            data = await eventservice.getPublicevents(distance, page, 30);
          } catch (publicError) {
            data = await eventservice.getAllevents(0, page, 30);
          }
        }
        setevents(data.events);
        setTotalPages(data.totalPages);
      } catch (error) {
        setevents([]);
        setTotalPages(1);
      }
    };
    fetchevents();
  }, [distance, page, user]);

  return (
    <div>
      {!user && (
        <div className="alert alert-info mb-4">
          <h4>Bienvenue sur CultureRadar !</h4>
          <p className="mb-2">
            Vous êtes en mode visiteur. Découvrez des événements culturels près de chez vous,
            puis
            <Link to="/login" className="alert-link"> connectez-vous</Link> ou
            <Link to="/register" className="alert-link"> créez un compte</Link>
            pour recevoir des recommandations personnalisées et vous inscrire aux événements.
          </p>
          <p className="mb-0">
            Vous êtes une entreprise, une association ou un lieu culturel ?
            <Link to="/publier-evenements" className="alert-link"> Accédez à l'espace B2B</Link>
            pour publier vos événements et toucher une audience locale.
          </p>
        </div>
      )}

      {user && <EventCarousel user={user} />}

      {user && (
        <div className="mb-4">
          <label htmlFor="distance" style={{ marginRight: 10 }}>
            Distance max (km) :
          </label>
          <input
            type="range"
            id="distance"
            min={5}
            max={100}
            step={1}
            value={distance}
            onChange={e => setDistance(Number(e.target.value))}
            style={{ width: 300, accentColor: "#1976d2" }}
          />
          <span style={{ marginLeft: 15, fontWeight: "bold", color: "#1976d2" }}>
            {distance} km
          </span>
        </div>
      )}

      <h5 className="mb-4 text-start fw-normal">
        {user ? "Evenements recommandes pour vous :" : "Derniers evenements"}
      </h5>

      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-4 mb-3 d-flex">
            <EventCard event={event} user={user} />
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center text-muted py-5">
          <h5>Aucun evenement trouve</h5>
          <p>Essayez de vous connecter pour des recommandations personnalisees.</p>
        </div>
      )}

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary mx-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Précédent
        </button>
        <span style={{ alignSelf: "center" }}>Page {page} / {totalPages}</span>
        <button
          className="btn btn-outline-primary mx-2"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Home;