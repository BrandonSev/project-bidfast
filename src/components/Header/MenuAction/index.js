import React from 'react';
import {NavLink} from "react-router-dom";

const MenuAction = ({ className, handleClose, activeClassName }) => {
  return (
    <div className={className}>
      <img src="/image/icon-search.svg" className="icon" alt="recherche" />
      <NavLink to='/connexion' exact className="btn btn-small btn-primary" onClick={handleClose} activeClassName={activeClassName}>
        Se connecter
      </NavLink>
      <NavLink to='/inscription' exact className="btn btn-small btn-primary" onClick={handleClose} activeClassName={activeClassName}>
        S'inscrire
      </NavLink>
    </div>
  );
};

export default MenuAction;
