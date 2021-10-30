import React from 'react';
import './burger.scss'

const Burger = (props) => {
  return (
    <div className="burger__menu" {...props}>
      <span/><span/><span/>
    </div>
  );
};

export default Burger;
