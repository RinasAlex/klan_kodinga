import React from "react";
import { NavLink } from "react-router-dom";

function Nav({ isToggle }) {
  return (
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
  );
}

export default Nav;
