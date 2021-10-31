import React from 'react';
import MenuList from "../Header/MenuList";
import MenuAction from "../Header/MenuAction";

const ContentBurger = ({open, handleClose}) => {
  return (
    <div className={`burger__content ${open ? "open" : ""}`}>
      <MenuAction className={"header__right"} handleClose={handleClose} activeClassName={''}/>
      <MenuList className="burger__list" handleClose={handleClose}/>
    </div>
  );
};

export default ContentBurger;
