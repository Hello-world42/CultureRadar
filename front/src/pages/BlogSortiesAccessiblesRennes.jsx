import React from "react";
import { Link } from "react-router-dom";
import SeoMeta from "../components/SeoMeta";
import "../styles/seoPages.css";

const BlogSortiesAccessiblesRennes = () => {
  return (
    <article className="seo-page text-start">
      <SeoMeta
        title="Sorties accessibles à Rennes : Guide complet PMR et handicap"
        description="Musées, salles et sorties accessibles à Rennes : repères pratiques pour organiser une sortie culturelle adaptée."
      />

      <header className="seo-hero mb-4">
        <p className="seo-kicker">Blog CultureRadar</p>
        <h1>Sorties accessibles à Rennes : guide complet pour préparer vos sorties</h1>
        <p>
          Rennes dispose d'une offre culturelle dynamique. Ce guide rassemble les points pratiques pour choisir des lieux accessibles et
          anticiper les conditions d'accueil.
        </p>
      </header>

      <section className="mb-4">
        <h2>Musées et expositions accessibles à Rennes</h2>
        <p>
          Plusieurs établissements rennais proposent des parcours adaptés, une signalétique améliorée et des services d'accompagnement sur
          réservation.
        </p>
        <h3>Ce qu'il faut vérifier avant la visite</h3>
        <p>
          Confirmez l'accessibilité des entrées, la disponibilité des ascenseurs, les conditions d'accompagnement et les horaires des
          dispositifs adaptés.
        </p>
      </section>

      <section className="mb-4">
        <h2>Théâtres, concerts et événements vivants</h2>
        <p>
          De nombreuses salles rennaises disposent de places PMR et d'un accueil spécifique. Les événements accessibles sont mis en avant
          selon les informations communiquées par les organisateurs.
        </p>
        <h3>Séances adaptées et médiation</h3>
        <p>
          Recherchez les séances avec surtitrage, interprétation LSF ou médiation renforcée pour améliorer l'expérience sur place.
        </p>
      </section>

      <section className="mb-4">
        <h2>Transports et mobilité locale</h2>
        <p>
          Préparez votre déplacement avec les outils de mobilité locale afin d'identifier les itinéraires les plus simples vers les lieux
          culturels.
        </p>
      </section>

      <section className="mb-4">
        <h2>Checklist avant de partir</h2>
        <ul>
          <li>Vérifier les accès et services disponibles dans le lieu choisi.</li>
          <li>Réserver les places dédiées dès que possible.</li>
          <li>Prévoir le trajet et le temps d'installation sur place.</li>
        </ul>
      </section>

      <section className="cta-box">
        <h2>Continuer l'exploration</h2>
        <p className="mb-0">
          <Link to="/rennes">Voir la page Rennes</Link> · <Link to="/accessibilite">Guide accessibilité</Link> ·{" "}
          <Link to="/blog/accessibilite-culture-guide-complet">Guide global accessibilité</Link>
        </p>
      </section>
    </article>
  );
};

export default BlogSortiesAccessiblesRennes;
