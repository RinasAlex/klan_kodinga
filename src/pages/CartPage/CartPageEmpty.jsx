import React from "react";
import Button from "@/components/Button/Button";
import { Link } from "react-router-dom";
import "./CartPageEmpty.scss";

function CartPageEmpty() {
  return (
    <div className="empty__container">
      <p>Looks like you have no items in your basket currently.</p>
      <Link to={"/"}>
        {" "}
        <Button className="btn-default-size" children="Continue Shopping" />
      </Link>
    </div>
  );
}

export default CartPageEmpty;
