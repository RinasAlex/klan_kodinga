import React, { useState } from "react";
import "./Header.scss";
import logo from "../../assets/headerImages/logo.svg";
import heart from "../../assets/headerImages/heart.svg";
import cart from "../../assets/headerImages/cart.svg";
import sun from "../../assets/headerImages/sun.svg";
import moon from "../../assets/headerImages/moon.svg";
import Burger from "./Burger";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [isToggle, setIsToggle] = useState(false);
  const { favourite } = useSelector(state => state.products);

  return (
    <nav className="navbar__container">
      <div className="navbar">
        <div className="navbar__logo">
          <NavLink to="/">
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
          <div
            className={`navbar__list-link ${
              !isToggle ? "navbar__list-link-active" : ""
            }`}
          >
            <ul className="link__container">
              <li className="link">
                <NavLink className="navlink" to={"/"}>
                  Main Page
                </NavLink>
              </li>
              <li className="link">
                <NavLink className="navlink" to={"categories"}>
                  Categories
                </NavLink>
              </li>
              <li className="link">
                <NavLink className="navlink" to={"products"}>
                  All products
                </NavLink>
              </li>
              <li className="link">
                <NavLink className="navlink" to={"sales"}>
                  All sales
                </NavLink>
              </li>
            </ul>
            <div className="discount_menu">1 day discount!</div>
          </div>
        </div>

        <div className="navbar__cart">
        <div className="navbar__heart">
            <NavLink to={"/favourites"} className="style__icons">
              <img className="heard" src={heart} alt="" />
              <span className="count" >{favourite.length}</span>
            </NavLink>
          </div>
          <NavLink to={"/cart"}>
            <img className="cart" src={cart} alt="" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;




