import React, { useContext } from "react";
import "./Burger.scss";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";

function Burger({ isToggle, setIsToggle }) {
  const { theme } = useContext(ThemeContext);


  return (
    
    <div className={`container__burger ${theme === 'dark' ? 'dark-border' : ''}`}>
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
