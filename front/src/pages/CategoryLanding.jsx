import React from "react";
import { Link, useParams } from "react-router-dom";
import SeoMeta from "../components/SeoMeta";
import "../styles/seoPages.css";

const cities = {
  nantes: "Nantes",
  rennes: "Rennes",
  toulouse: "Toulouse",
};

const categories = {
  concerts: {
    label: "concerts",
    titlePrefix: "Concerts",
    h1Prefix: "Concerts",
    description:
      "Découvrez les concerts à {city} : salles locales, live music, agenda et infos pratiques d'accessibilité.",
    intro:
      "Consultez les concerts et événements musicaux à {city}, comparez les horaires, les tarifs et repérez les lieux adaptés à vos besoins.",
  },
  expositions: {
    label: "expositions",
    titlePrefix: "Expositions",
    h1Prefix: "Expositions",
    description:
      "Trouvez les expositions à {city} : musées, galeries, parcours culturels et accessibilité des lieux.",
    intro:
      "Retrouvez les expositions incontournables à {city}, des musées aux lieux indépendants, avec informations pratiques pour organiser votre visite.",
  },
  theatre: {
    label: "theatre",
    titlePrefix: "Théâtre",
    h1Prefix: "Théâtre",
    description:
      "Agenda théâtre à {city} : spectacles vivants, scènes locales, programmation et accessibilité.",
    intro:
      "Explorez l'offre de théâtre à {city} : pièces, spectacles vivants et événements culturels avec repères utiles avant réservation.",
  },
};

const CategoryLanding = () => {
  const { city, category } = useParams();
  const cityName = cities[city] || "Nantes";
  const categoryData = categories[category] || categories.concerts;

  const pageTitle = `${categoryData.titlePrefix} ${cityName} : agenda culturel local | CultureRadar`;
  const pageDescription = categoryData.description.replace("{city}", cityName);
  const introText = categoryData.intro.replace("{city}", cityName);

  return (
    <article className="seo-page text-start">
      <SeoMeta title={pageTitle} description={pageDescription} />

      <header className="seo-hero mb-4">
        <p className="seo-kicker">Catégorie locale</p>
        <h1>
          {categoryData.h1Prefix} à {cityName} : agenda et recommandations
        </h1>
        <p>{introText}</p>
      </header>

      <section className="mb-4">
        <h2>Programmation {categoryData.label} à {cityName}</h2>
        <h3>Événements à venir</h3>
        <p>
          Une sélection éditoriale des événements en cours et à venir pour vous aider à choisir rapidement une sortie adaptée à vos
          préférences.
        </p>
        <h3>Infos pratiques utiles</h3>
        <p>
          Horaires, niveaux de prix, repères de localisation et indications d'accessibilité sont centralisés pour préparer votre sortie.
        </p>
      </section>

      <section className="mb-4">
        <h2>Sorties accessibles et inclusives</h2>
        <h3>Repères PMR et accompagnement</h3>
        <p>
          Nous mettons en avant les informations d'accessibilité communiquées par les lieux pour faciliter la préparation des visiteurs.
        </p>
        <p className="mb-0">
          <Link to="/accessibilite">Voir le guide accessibilité</Link>
        </p>
      </section>

      <section>
        <h2>Maillage local</h2>
        <p>
          <Link to={`/${city}`}>Retour au guide {cityName}</Link> · <Link to={`/${city}/concerts`}>Concerts</Link> ·{" "}
          <Link to={`/${city}/expositions`}>Expositions</Link> · <Link to={`/${city}/theatre`}>Théâtre</Link>
        </p>
      </section>
    </article>
  );
};

export default CategoryLanding;
