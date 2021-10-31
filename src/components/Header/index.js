import React, {useState} from 'react';
import {NavLink, Redirect} from "react-router-dom";
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
  const handleClose = e => {
    setOpen(false)
    return <Redirect to={e.target.href}/>
  }
  return (
    <nav className={`header ${open ? "is-open" : ""}`}>
      <NavLink to='/' exact className='header__logo' activeClassName=''>
        <img src="/image/Logo.png" alt="Logo"/>
      </NavLink>
      <ContentBurger open={open} handleClose={handleClose}/>
      <MenuList className="nav__mobile" activeClassName={''}/>
      <MenuList className="header__menu"/>
      <MenuAction className="header__right"/>
      <Burger onClick={handleBurgerClick}/>
    </nav>
  );
};

export default Header;
