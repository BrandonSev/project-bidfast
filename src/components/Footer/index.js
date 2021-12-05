import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer__border"></span>
      <div className="footer__body">
        <ul className="footer__menu">
          <li>Accueil</li>
          <li>Acheter</li>
          <li>Vendre</li>
          <li>Rechercher</li>
        </ul>
        <p className="footer__copyright">Copyright © 2021 • Brandon Seveste</p>
      </div>
    </footer>
  );
};

export default Footer;
