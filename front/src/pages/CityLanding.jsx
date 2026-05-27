import React from "react";
import { Link } from "react-router-dom";
import SeoMeta from "../components/SeoMeta";
import "../styles/seoPages.css";

const cityContent = {
  nantes: {
    name: "Nantes",
    title: "Sortie culturelle Nantes : Agenda événements concerts expos | CultureRadar",
    description:
      "Découvrez les meilleurs événements culturels à Nantes. Concerts, expositions, théâtre et festivals avec filtres accessibilité et budget.",
    h1: "Sortie culturelle à Nantes : votre agenda événements complet",
    intro:
      "CultureRadar centralise les sorties culturelles de Nantes pour vous aider à trouver rapidement une idée de sortie selon vos goûts, votre budget et vos contraintes de mobilité.",
  },
  rennes: {
    name: "Rennes",
    title: "Événements culturels Rennes : Que faire ce weekend | CultureRadar",
    description:
      "Trouvez votre prochaine sortie à Rennes : concerts, expositions et théâtre avec filtres accessibilité PMR et recommandations personnalisées.",
    h1: "Sortie culturelle à Rennes : idées de sorties et agenda local",
    intro:
      "Cette page regroupe les événements incontournables de Rennes et les bons plans de dernière minute pour organiser une sortie adaptée à vos préférences.",
  },
  toulouse: {
    name: "Toulouse",
    title: "Sortie Toulouse : Agenda culturel concerts expositions | CultureRadar",
    description:
      "Tous les événements culturels à Toulouse en un clic : concerts, expositions, festivals et lieux accessibles.",
    h1: "Sortie culturelle à Toulouse : agenda local et recommandations",
    intro:
      "Explorez la scène culturelle toulousaine avec une sélection mise à jour chaque semaine : spectacles, festivals, musées et événements inclusifs.",
  },
};

const CityLanding = ({ cityKey }) => {
  const city = cityContent[cityKey] || cityContent.nantes;

  return (
    <article className="seo-page text-start">
      <SeoMeta title={city.title} description={city.description} />

      <header className="seo-hero mb-4">
        <p className="seo-kicker">Guide local</p>
        <h1>{city.h1}</h1>
        <p>{city.intro}</p>
      </header>

      <section className="mb-4">
        <h2>Événements ce weekend à {city.name}</h2>
        <h3>Concerts et musique live</h3>
        <p>
          Découvrez les scènes locales, les petites salles indépendantes et les concerts à venir avec une vue claire sur les horaires,
          les tarifs et l'accessibilité.
          {" "}<Link to={`/${cityKey}/concerts`}>Voir la catégorie concerts</Link>
        </p>
        <h3>Expositions et musées</h3>
        <p>
          Identifiez les expositions en cours et les parcours recommandés selon votre temps disponible, en intégrant les infos pratiques
          utiles avant le déplacement.
          {" "}<Link to={`/${cityKey}/expositions`}>Voir la catégorie expositions</Link>
        </p>
        <h3>Théâtre et spectacles vivants</h3>
        <p>
          Consultez les spectacles du moment, les événements jeune public et les représentations ponctuelles dans les lieux partenaires.
          {" "}<Link to={`/${cityKey}/theatre`}>Voir la catégorie théâtre</Link>
        </p>
      </section>

      <section className="mb-4">
        <h2>Agenda culturel {city.name} par mois</h2>
        <h3>Événements du mois en cours</h3>
        <p>
          Une sélection éditoriale pour préparer vos sorties de manière simple, avec filtres par date et type d'événement.
        </p>
        <h3>Événements du mois prochain</h3>
        <p>
          Anticipez vos réservations et comparez les options selon votre budget et vos centres d'intérêt.
        </p>
      </section>

      <section className="mb-4">
        <h2>Événements accessibles à {city.name}</h2>
        <h3>Lieux accessibles PMR</h3>
        <p>
          Nous mettons en avant les lieux avec accès de plain-pied, ascenseurs et places dédiées pour faciliter les déplacements.
        </p>
        <h3>Informations handicap visuel et auditif</h3>
        <p>
          Retrouvez les événements proposant audiodescription, sous-titrage ou interprétation LSF quand l'information est disponible.
        </p>
        <p>
          <Link to="/accessibilite">Voir le guide accessibilité complet</Link>
        </p>
      </section>

      <section className="mb-2">
        <h2>Lieux culturels indépendants</h2>
        <p>
          CultureRadar valorise les acteurs locaux pour augmenter leur visibilité : galeries, tiers-lieux, scènes alternatives et
          associations de quartier.
        </p>
        <p>
          Lire aussi :{" "}
          <Link to="/blog/sorties-accessibles-nantes-guide-complet">
            Sorties accessibles à Nantes : guide complet
          </Link>
        </p>
      </section>
    </article>
  );
};

export default CityLanding;
