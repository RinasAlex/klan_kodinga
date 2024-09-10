import React, { useState } from "react";
import "./Header.scss";
import logo from "@/assets/headerImages/logo.svg";
import heart from "@/assets/headerImages/heart.svg";
import sun from "@/assets/headerImages/sun.svg";
import moon from "@/assets/headerImages/moon.svg";
import cartBag from "@/assets/headerImages/cart.svg";
import Burger from "./Burger";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalWindow from "../ModalWindow/ModalWindow";

function Header() {
  const [isToggle, setIsToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { favourite } = useSelector(state => state.products);

  const { cart } = useSelector((state) => state.products);

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

          {showModal && (
            <ModalWindow onClose={() => {
              setShowModal(false);
            }} />
          )}

          <button className="discount" onClick={() => { setShowModal(true) }}>1 day discount!</button>


          <Burger isToggle={isToggle} setIsToggle={setIsToggle} />
          <div
            className={`navbar__list-link ${!isToggle ? "navbar__list-link-active" : ""
              }`} >

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
          </div>
        </div>

        <div className="navbar__cart">
          <NavLink to={"/favourites"}>
            <img className="heard" src={heart} alt="" />

            <span>{favourite.length}</span>
          </NavLink>
          <NavLink className="cart__container" to={"/cart"}>
            <img className="cart" src={cartBag} alt="" />
            <p className="length">{cart.length}</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;
