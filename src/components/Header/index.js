import React, { useState } from 'react';
import {NavLink} from "react-router-dom";
import MenuList from "./MenuList/";
import Burger from "../Burger";
import ContentBurger from "../Burger/ContentBurger";
import MenuAction from "./MenuAction";
import './header.scss'

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleBurgerClick = (e) => {
    e.preventDefault()
    setOpen(!open)
  }
  return (
    <nav className={`navbar ${open ? "is-open" : ""}`}>
      <NavLink to='/' exact className='navbar__logo' activeClassName=''>
        <img src="/image/Logo.png" alt="Logo"/>
      </NavLink>
      <ContentBurger open={open} />
      <MenuList className="nav__mobile"/>
      <MenuList className="navbar__menu"/>
      <MenuAction />
      <Burger onClick={handleBurgerClick}/>
    </nav>
  );
};

export default Header;
