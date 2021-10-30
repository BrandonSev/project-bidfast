import React from "react";
import {NavLink} from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__left">
        <h1>
          Bidfast, <br/> L'enchère par <br/>
          <span className="text-primary">excellence</span>
        </h1>
        <p className="hero__left_desc">
          Remportez un bien parmis plus de 15.000+ annonces, cliquez ici pour
          accédez au offres
        </p>
        <NavLink to={'/annonces'} className="hero__left_show btn btn-big btn-primary">
          Voir les annonces
        </NavLink>
        <p>N’hésitez plus, inscrivez-vous dés maintenant, en cliquant
          <NavLink to='/se-connecter' style={{ textDecoration: "underline"}}>{" "}
            içi
          </NavLink>
        </p>
      </div>
      <div className="hero__right">
        <img src='/image/hero.svg' alt={"hero"}/>
      </div>
    </section>
  );
};

export default Hero;
