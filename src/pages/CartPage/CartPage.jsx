import React from "react";
import "./CartPage.scss";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { cart } = useSelector((state) => state.products);
  console.log(cart);

  return (
    <div className="cart__container">
      <div className="producsts__container">{}</div>
      <div className="order__container">
        <h3></h3>
        <div>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
