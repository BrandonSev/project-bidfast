import React from 'react';
import Bid from "../components/Bid";

const Profil = () => {
  return (
    <>
      <div className="profile__baner">
        <div className="container">
          <div className="avatar">
            <img src="./image/avatar.png" alt="avatar"/>
          </div>
          <div className="description">
            <h2>Bonjour, Brandon</h2>
            <p className="text-muted">Ici retrouvez toutes vos informations de compte, vos enchères en cours...</p>
          </div>
        </div>
        <nav>
          <ul className={"container"}>
            <li>
              <span><img src="./image/bid-icon.svg" alt="bid icon"/></span>
              <a href="#">Mes annonces</a>
            </li>
            <li>
              <span><img src="./image/follow-icon.svg" alt="bid icon"/></span>
              <a href="#">Suivre mes offres</a>
            </li>
            <li>
              <span><img src="./image/edit-icon.svg" alt="bid icon"/></span>
              <a href="#">Mes informations</a>
            </li>
          </ul>
        </nav>
      </div>
      <Bid />
    </>
  );
};

export default Profil;
