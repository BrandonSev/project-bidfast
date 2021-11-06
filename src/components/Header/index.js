import React, {useState, useRef, useEffect} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import MenuList from "./MenuList/";
import Burger from "../Burger";
import ContentBurger from "../Burger/ContentBurger";
import MenuAction from "./MenuAction";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const ref = useRef();
  const handleBurgerClick = (e) => {
    e.preventDefault()
    setOpen(!open)
  }
  const handleClose = e => {
    setOpen(false)
    return <Redirect to={e.target.href}/>
  }
  const controlNav = () => {
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        ref.current.style.top = "0";
        ref.current.style.boxShadow = '0 3px 55px rgba(0,0,0,0.19)';
        ref.current.style.borderBottom = '2px solid var(--primary-light)';
        ref.current.style.transition = 'top .5s ease-in-out, box-shadow .5s ease'
        if(currentScrollPos < 55){
          ref.current.style.boxShadow = '';
          ref.current.style.borderBottom = '';
        }
      } else {
        ref.current.style.top = -ref.current.clientHeight - 2 /* 3 = width Border */ + "px";
        ref.current.style.boxShadow = '';
      }
      setPrevScrollPos(currentScrollPos)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', controlNav)
    return () => {
      window.removeEventListener('scroll', controlNav)
    }
  });

  return (
    <nav ref={ref} id="nav">
      <div className="container">
        <div className={`header ${open ? "is-open" : ""}`}>
          <NavLink to='/' exact className='header__logo' activeClassName=''>
            <img src="/image/Logo.png" alt="Logo"/>
          </NavLink>
          <ContentBurger open={open} handleClose={handleClose}/>
          <MenuList className="nav__mobile" activeClassName={''}/>
          <MenuList className="header__menu"/>
          <MenuAction className="header__right" activeClassName={''}/>
          <Burger onClick={handleBurgerClick}/>
        </div>
      </div>
    </nav>
  );
};

export default Header;
