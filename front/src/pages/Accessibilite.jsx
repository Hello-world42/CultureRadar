import React from "react";
import { Link } from "react-router-dom";
import SeoMeta from "../components/SeoMeta";
import "../styles/seoPages.css";

const Accessibilite = () => {
  return (
    <article className="seo-page text-start">
      <SeoMeta
        title="Événements accessibles PMR et handicap | CultureRadar Grand Ouest"
        description="Plateforme culturelle inclusive : trouvez des événements accessibles PMR et handicap à Nantes, Rennes et Toulouse."
      />

      <header className="seo-hero mb-4">
        <p className="seo-kicker">Culture inclusive</p>
        <h1>Événements accessibles PMR et handicap</h1>
        <p>
          CultureRadar facilite la découverte de sorties culturelles adaptées aux personnes en situation de handicap avec des informations
          pratiques sur les lieux et les événements.
        </p>
      </header>

      <section className="mb-4">
        <h2>Comment nous qualifions l'accessibilité</h2>
        <h3>Mobilité et accès PMR</h3>
        <p>
          Vérification des entrées, ascenseurs, sanitaires adaptés et emplacements réservés pour les personnes en fauteuil roulant.
        </p>
        <h3>Accessibilité auditive</h3>
        <p>
          Mise en avant des dispositifs comme les boucles magnétiques, le sous-titrage et les séances interprétées en LSF.
        </p>
        <h3>Accessibilité visuelle</h3>
        <p>
          Référencement des événements proposant audiodescription, médiation tactile ou accompagnement dédié.
        </p>
      </section>

      <section className="mb-4">
        <h2>Guides locaux accessibles</h2>
        <p>
          Consultez nos pages locales pour trouver des sorties adaptées dans votre ville et préparer vos déplacements plus facilement.
        </p>
        <ul>
          <li>
            <Link to="/nantes">Guide Nantes</Link>
          </li>
          <li>
            <Link to="/rennes">Guide Rennes</Link>
          </li>
          <li>
            <Link to="/toulouse">Guide Toulouse</Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>Articles conseils</h2>
        <p>
          Consultez nos guides détaillés avec conseils pratiques, lieux et bonnes pratiques de préparation par ville.
        </p>
        <ul>
          <li>
            <Link to="/blog/accessibilite-culture-guide-complet">Guide global accessibilité et culture</Link>
          </li>
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
    </article>
  );
};

export default Accessibilite;
