import React from "react";
import "./SmallButton.scss";

const SmallButton = ({ className = "", children, ...props }) => {
  return (
    <div className="smallButton">
    
       <div className="smallButton__btn-line"></div>
      <button className={`smallButton__btn-small ${className}`} {...props}>
        {children}
      </button>
       </div>
  );
};

export default SmallButton;
