import React from "react";
import "./Burger.scss";

function Burger({ isToggle, setIsToggle }) {
  return (
    <div className="container__burger">
      <div
        onClick={() => setIsToggle(!isToggle)}
        className={isToggle ? "burger active" : "burger"}
      >
        <span className="span"></span>
      </div>
    </div>
  );
}

export default Burger;
