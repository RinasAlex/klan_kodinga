import React, { useContext, useState } from "react";
import "./Header.scss";
import logo from "@/assets/headerImages/logo.svg";
import { IoIosHeartEmpty } from "react-icons/io";
import sun from "@/assets/headerImages/sun.svg";
import moon from "@/assets/headerImages/moon.svg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Burger from "./Burger";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalWindow from "../ModalWindow/ModalWindow";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";

function Header() {
  const [isToggle, setIsToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const { favourite } = useSelector(state => state.products);
  const { cart } = useSelector((state) => state.products);

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <nav className={`navbar__container ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
      <div className="navbar">
        <div className="navbar__logo">
          <NavLink to="/">
            <img className="logo" src={logo} alt="" />
          </NavLink>
          <label className="switch">
            <input className="switch__input" type="checkbox" onClick={changeTheme} />
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
                <NavLink className={`navlink ${theme === "dark" ? "dark-text" : ""}`} to={"/"}>
                  Main Page
                </NavLink>
              </li>
              <li className="link">
                <NavLink className={`navlink ${theme === "dark" ? "dark-text" : ""}`} to={"categories"}>
                  Categories
                </NavLink>
              </li>
              <li className="link">
                <NavLink className={`navlink ${theme === "dark" ? "dark-text" : ""}`} to={"products"}>
                  All products
                </NavLink>
              </li>
              <li className="link">
                <NavLink className={`navlink ${theme === "dark" ? "dark-text" : ""}`} to={"sales"}>
                  All sales
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar__cart">
          <div className="navbar__heart">
            <NavLink to={"/favourites"} className={`style__icons ${theme === "dark" ? "dark-text" : ""}`}>
            <IoIosHeartEmpty className="heard" />
              <span className="count">{favourite.length}</span>
            </NavLink>
          </div>
          <NavLink className={`cart__container ${theme === "dark" ? "dark-text" : ""}`} to={"/cart"}>
            <HiOutlineShoppingBag className="cart" />
            <span className="length">{cart.length}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;




