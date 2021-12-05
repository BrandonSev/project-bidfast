import React from "react";
import { NavLink } from "react-router-dom";

const MenuList = ({ className, handleClose, activeClassName }) => {
  return (
    <ul className={className}>
      <li>
        <NavLink
          to="/"
          exact
          onClick={handleClose}
          activeClassName={activeClassName}
        >
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/acheter"
          exact
          onClick={handleClose}
          activeClassName={activeClassName}
        >
          Acheter
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/vendre"
          exact
          onClick={handleClose}
          activeClassName={activeClassName}
        >
          Vendre
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/recherche"
          exact
          onClick={handleClose}
          activeClassName={activeClassName}
        >
          Rechercher
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuList;
