import React from "react";
import { NavLink } from "react-router-dom";

function Nav({ isToggle }) {
  return (
    <ul
      className={`navbar__list-link ${
        !isToggle ? "navbar__list-link-active" : ""
      }`}
    >
      <li href="" className="link">
        <NavLink className="navlink" to={"/"}>
          {" "}
          Main Page
        </NavLink>
      </li>
      <li href="" className="link">
        <NavLink className="navlink" to={"categories"}>
          {" "}
          Categories
        </NavLink>
      </li>
      <li href="" className="link">
        <NavLink className="navlink" to={"products"}>
          {" "}
          All producst
        </NavLink>
      </li>
      <li href="" className="link">
        <NavLink className="navlink" to={"sales"}>
          {" "}
          All sales
        </NavLink>
      </li>
      <div className="discount_menu">1 day discount!</div>
    </ul>
  );
}

export default Nav;
