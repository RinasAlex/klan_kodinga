import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";

const Breadcrumbs = ({ breadcrumbs }) => {
  const {theme} = useContext(ThemeContext);

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((breadcrumb, index) => (
        //Для каждого элемента массива вызывается функция, которая принимает два аргумента: breadcrumb и index
        <span key={index} className="breadcrumbs-item">
          {index > 0 && <span className="breadcrumbs__line"></span>}
          {breadcrumb.link ? (
            <Link
              to={breadcrumb.link}
              className={`breadcrumbs-link ${theme === "dark" ? "dark-text" : ""}
            ${
              index === breadcrumbs.length - 1 ? "breadcrumbs-link-active" : ""
            }`}
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span className="breadcrumbs-label">{breadcrumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};
export default Breadcrumbs;
