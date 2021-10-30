import React from 'react';
import {NavLink} from "react-router-dom";

const MenuList = ({ className }) => {
  return (
    <ul className={className}>
      <li>
        <NavLink to='/' exact>Accueil</NavLink>
      </li>
      <li>
        <NavLink to='/acheter' exact>Acheter</NavLink>
      </li>
      <li>
        <NavLink to='/vendre' exact>Vendre</NavLink>
      </li>
      <li>
        <NavLink to='/recherche' exact>Rechercher</NavLink>
      </li>
    </ul>
  );
};

export default MenuList;
