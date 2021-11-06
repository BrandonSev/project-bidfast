import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {userIdContext} from "../../AppContext";
import Logout from "../../Logout";

const MenuAction = ({className, handleClose, activeClassName}) => {
  const userContext = useContext(userIdContext);

  return (
    <div className={className}>
      <img src="/image/icon-search.svg" className="icon" alt="recherche"/>
      {userContext.userId ? (
        <>
          <NavLink to='/mon-compte' exact className="btn btn-small btn-primary" onClick={handleClose}
                   activeClassName={activeClassName}>
            Mon compte
          </NavLink>
          <Logout/>
        </>
      ) : (
        <>
          <NavLink to='/connexion' exact className="btn btn-small btn-primary" onClick={handleClose}
                   activeClassName={activeClassName}>
            Se connecter
          </NavLink>
          <NavLink to='/inscription' exact className="btn btn-small btn-primary" onClick={handleClose}
                   activeClassName={activeClassName}>
            S'inscrire
          </NavLink>
        </>
      )}
    </div>
  );
};

export default MenuAction;
