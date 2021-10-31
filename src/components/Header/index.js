import React, { useState } from 'react';
import {NavLink} from "react-router-dom";
import MenuList from "./MenuList/";
import Burger from "../Burger";
import ContentBurger from "../Burger/ContentBurger";
import MenuAction from "./MenuAction";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleBurgerClick = (e) => {
    e.preventDefault()
    setOpen(!open)
  }
  return (
    <nav className={`header ${open ? "is-open" : ""}`}>
      <NavLink to='/' exact className='header__logo' activeClassName=''>
        <img src="/image/Logo.png" alt="Logo"/>
      </NavLink>
      <ContentBurger open={open} />
      <MenuList className="nav__mobile"/>
      <MenuList className="header__menu"/>
      <MenuAction className="header__right" />
      <Burger onClick={handleBurgerClick}/>
    </nav>
  );
};

export default Header;
