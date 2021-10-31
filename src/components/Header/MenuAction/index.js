import React from 'react';
import {NavLink} from "react-router-dom";
import Logout from "../../Logout";

const MenuAction = ({ className }) => {
  return (
    <div className={className}>
      <img src="/image/icon-search.svg" className="icon" alt="recherche" />
      <NavLink to='/mon-compte' exact className="btn btn-small btn-primary">
        Mon compte
      </NavLink>
      <Logout />
    </div>
  );
};

export default MenuAction;
