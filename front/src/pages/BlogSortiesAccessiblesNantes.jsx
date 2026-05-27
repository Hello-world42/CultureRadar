import React from "react";
import { Link } from "react-router-dom";
import SeoMeta from "../components/SeoMeta";
import "../styles/seoPages.css";

const BlogSortiesAccessiblesNantes = () => {
  return (
    <article className="seo-page text-start">
      <SeoMeta
        title="Sorties accessibles à Nantes : Guide complet PMR et handicap"
        description="Découvrez les meilleures sorties culturelles accessibles à Nantes : musées, salles de concert et théâtres adaptés PMR."
      />

      <header className="seo-hero mb-4">
        <p className="seo-kicker">Blog CultureRadar</p>
        <h1>Sorties accessibles à Nantes : le guide complet pour profiter de la culture</h1>
        <p>
          Nantes propose de nombreux lieux engagés en matière d'accessibilité. Ce guide vous aide à identifier rapidement les sorties
          adaptées selon vos besoins.
        </p>
      </header>

      <section className="mb-4">
        <h2>Les musées accessibles à Nantes</h2>
        <p>
          Le Musée d'arts de Nantes et d'autres institutions locales proposent des aménagements utiles : ascenseurs, dispositifs
          d'accompagnement et parcours adaptés.
        </p>
        <h3>Conseils pratiques pour préparer la visite</h3>
        <p>
          Contactez le lieu en amont pour valider les conditions d'accès, réserver un accompagnement si nécessaire et anticiper le trajet.
        </p>
      </section>

      <section className="mb-4">
        <h2>Salles de spectacle et théâtres accessibles</h2>
        <p>
          Plusieurs salles nantaises disposent d'espaces PMR, d'un accueil dédié et de séances adaptées selon les programmations.
        </p>
        <h3>Audiodescription et représentations adaptées</h3>
        <p>
          Consultez la programmation des séances avec audiodescription, surtitrage ou interprétation LSF pour planifier votre sortie.
        </p>
      </section>

      <section className="mb-4">
        <h2>Cinémas accessibles à Nantes</h2>
        <p>
          Certaines salles proposent des séances indiquées AD et SME. Pensez à vérifier la disponibilité des places et des équipements
          avant votre venue.
        </p>
      </section>

      <section className="mb-4">
        <h2>Transports et accès aux lieux culturels</h2>
        <p>
          Le réseau local facilite les déplacements vers les principaux lieux culturels. Si besoin, utilisez les services spécialisés pour
          des trajets porte-à-porte sur réservation.
        </p>
      </section>

      <section className="mb-4">
        <h2>Nos conseils pour une sortie réussie</h2>
        <ul>
          <li>Vérifiez les conditions d'accessibilité quelques jours avant l'événement.</li>
          <li>Consultez les retours de la communauté pour les détails pratiques.</li>
          <li>Signalez les difficultés rencontrées pour améliorer l'information disponible.</li>
        </ul>
      </section>

      <section className="cta-box">
        <h2>Retrouvez tous les événements accessibles</h2>
        <p>
          Créez un compte pour recevoir une sélection personnalisée d'événements culturels adaptés à vos préférences.
        </p>
        <p className="mb-0">
          <Link to="/register">Créer un compte gratuit</Link> · <Link to="/accessibilite">Voir le guide accessibilité</Link> ·{" "}
          <Link to="/blog/accessibilite-culture-guide-complet">Guide global</Link> ·{" "}
          <Link to="/blog/sorties-accessibles-rennes-guide-complet">Guide Rennes</Link> ·{" "}
          <Link to="/blog/sorties-accessibles-toulouse-guide-complet">Guide Toulouse</Link> · <Link to="/nantes">Retour au guide Nantes</Link>
        </p>
      </section>
    </article>
  );
};

export default BlogSortiesAccessiblesNantes;
