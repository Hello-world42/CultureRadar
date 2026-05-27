import React from "react";
import { Link } from "react-router-dom";
import { isProAccount } from "../utils/accountType";

const ProPublish = ({ user }) => {
  const isPro = isProAccount(user);

  return (
    <section className="legal-page">
      <h1>Publier Vos Evenements Sur CultureRadar</h1>
      <p>
        Cette page est dediee aux acteurs B2B: entreprises, associations, salles de spectacle,
        festivals et institutions qui souhaitent diffuser leurs evenements aupres d'un public local.
      </p>

      <h2>Pourquoi publier sur CultureRadar ?</h2>
      <ul>
        <li>Visibilite locale aupres d'une audience deja interessee par la culture.</li>
        <li>Mise en avant de vos dates, lieux et liens de reservation.</li>
        <li>Diffusion sur une plateforme orientee decouverte et recommandations.</li>
      </ul>

      <h2>Comment ca marche ?</h2>
      <ol>
        <li>Creer un compte ou connectez-vous.</li>
        <li>Activer le plan Pro dans votre profil.</li>
        <li>Acceder a la page d'ajout et publier vos evenements.</li>
      </ol>

      <div className="mt-4 d-flex flex-wrap gap-2">
        {!user && (
          <>
            <Link to="/register" className="btn btn-primary">
              Creer un compte B2B
            </Link>
            <Link to="/login" className="btn btn-outline-primary">
              Se connecter
            </Link>
          </>
        )}
        {user && !isPro && (
          <Link to="/profile" className="btn btn-primary">
            Passer au plan Pro
          </Link>
        )}
        {user && isPro && (
          <Link to="/add-event" className="btn btn-success">
            Publier un evenement
          </Link>
        )}
      </div>
    </section>
  );
};

export default ProPublish;
