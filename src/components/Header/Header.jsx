import React, { useState } from "react";
import "./Header.scss";
import logo from "../../assets/headerImages/logo.svg";
import heard from "../../assets/headerImages/heard.svg";
import cart from "../../assets/headerImages/cart.svg";
import sun from "../../assets/headerImages/sun.svg";
import moon from "../../assets/headerImages/moon.svg";
import Burger from "./Burger";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";

function Header() {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">
          {" "}
          <img className="logo" src={logo} alt="" />
        </NavLink>
        <label className="switch">
          <input className="switch__input" type="checkbox" />
          <span className="switch__slider"></span>
          <img className="sun" src={sun} alt="" />
          <img className="moon" src={moon} alt="" />
        </label>
      </div>

      <div className="navbar__list">
        <div className="discount">1 day discount!</div>
        <Burger isToggle={isToggle} setIsToggle={setIsToggle} />
        <Nav isToggle={isToggle} />
      </div>

      <div className="navbar__cart">
        <NavLink>
          <img className="heard" src={heard} alt="" />
        </NavLink>
        <NavLink>
          <img className="cart" src={cart} alt="" />
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
