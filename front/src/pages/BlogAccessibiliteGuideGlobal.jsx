import React from "react";
import { Link } from "react-router-dom";
import SeoMeta from "../components/SeoMeta";
import "../styles/seoPages.css";

const BlogAccessibiliteGuideGlobal = () => {
  return (
    <article className="seo-page text-start">
      <SeoMeta
        title="Accessibilité et culture : guide complet pour organiser vos sorties"
        description="Guide global CultureRadar : critères d'accessibilité, préparation de sortie et ressources pour Nantes, Rennes et Toulouse."
      />

      <header className="seo-hero mb-4">
        <p className="seo-kicker">Blog CultureRadar</p>
        <h1>Accessibilité et culture : guide complet pour organiser des sorties inclusives</h1>
        <p>
          Ce guide réunit les bonnes pratiques pour choisir un événement culturel accessible, préparer votre trajet et améliorer l'expérience
          sur place.
        </p>
      </header>

      <section className="mb-4">
        <h2>Comprendre les critères d'accessibilité</h2>
        <h3>Mobilité</h3>
        <p>
          Accès de plain-pied, ascenseurs, places dédiées, sanitaires adaptés et circulation intérieure sont des points essentiels à
          vérifier.
        </p>
        <h3>Auditif</h3>
        <p>
          Recherchez les événements avec boucle magnétique, sous-titrage, interprétation LSF ou supports écrits renforcés.
        </p>
        <h3>Visuel</h3>
        <p>
          Les dispositifs comme l'audiodescription, les médiations tactiles et l'accompagnement personnalisé améliorent fortement
          l'expérience.
        </p>
      </section>

      <section className="mb-4">
        <h2>Préparer une sortie culturelle sans friction</h2>
        <h3>Avant la réservation</h3>
        <p>
          Vérifiez la fiche événement, contactez l'organisateur si nécessaire et confirmez la disponibilité des dispositifs annoncés.
        </p>
        <h3>Le jour de l'événement</h3>
        <p>
          Arrivez avec un peu d'avance pour faciliter l'accueil et l'installation. Préparez un plan alternatif en cas d'imprévu.
        </p>
      </section>

      <section className="mb-4">
        <h2>Ressources locales recommandées</h2>
        <ul>
          <li>
            <Link to="/blog/sorties-accessibles-nantes-guide-complet">Sorties accessibles à Nantes</Link>
          </li>
          <li>
            <Link to="/blog/sorties-accessibles-rennes-guide-complet">Sorties accessibles à Rennes</Link>
          </li>
          <li>
            <Link to="/blog/sorties-accessibles-toulouse-guide-complet">Sorties accessibles à Toulouse</Link>
          </li>
        </ul>
      </section>

      <section className="cta-box">
        <h2>Accéder aux pages pratiques</h2>
        <p className="mb-0">
          <Link to="/accessibilite">Page accessibilité</Link> · <Link to="/nantes">Nantes</Link> · <Link to="/rennes">Rennes</Link> ·{" "}
          <Link to="/toulouse">Toulouse</Link>
        </p>
      </section>
    </article>
  );
};

export default BlogAccessibiliteGuideGlobal;
