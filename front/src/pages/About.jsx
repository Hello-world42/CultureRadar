import React from "react";

const About = () => (
  <div className="mx-auto" style={{ maxWidth: 700 }}>
    <h2>A propos de Capsule Culture</h2>
    <p>
      Capsule Culture est une plateforme collaborative dédiée à la découverte, au partage et à la participation à des événements culturels. 
      Notre mission est de rapprocher les passionnés de culture, de faciliter l’accès à l’information sur les événements et de permettre à chacun de s’impliquer dans la vie culturelle locale.
    </p>
    <h4>Fonctionnalités principales :</h4>
    <ul>
      <li>Découvrir et rechercher des événements culturels</li>
      <li>Ajouter de nouveaux événements</li>
      <li>Participer à des événements et suivre ses participations</li>
      <li>Gérer son profil utilisateur</li>
    </ul>
    <p>
      Pour toute question ou suggestion, contactez-nous à <a href="mailto:contact@capsule-culture.com">contact@capsule-culture.com</a>.
    </p>
    <p className="text-muted" style={{ fontSize: "0.9em" }}>
      © 2025 Capsule Culture - Tous droits réservés
    </p>
  </div>
);

export default About;