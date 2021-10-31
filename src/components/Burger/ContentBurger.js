import React from 'react';
import MenuList from "../Header/MenuList";
import MenuAction from "../Header/MenuAction";

const ContentBurger = ({open}) => {
  return (
    <div className={`burger__content ${open ? "open" : ""}`}>
      <MenuAction className={"header__right"}/>
      <MenuList className="burger__list"/>
    </div>
  );
};

export default ContentBurger;
