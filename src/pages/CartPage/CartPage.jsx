import React from "react";
import "./CartPage.scss";
import { useSelector } from "react-redux";
import deleteBtn from "../../assets/image/delete.svg";
import "./CartPage.scss";

const CartPage = () => {
  const { cart } = useSelector((state) => state.products);

  return (
    <div className="cart__container">
      <div className="products__container">
        {cart &&
          cart.map((item) => (
            <div key={item.id} className="cart_product__container">
              <img
                src={`https://exam-server-5c4e.onrender.com/${item.image}`}
                alt=""
                className="img"
              />
              <div className="info__container">
                <div className="title__box">
                  <p className="title">{item.title}</p>
                  <img className="delete" src={deleteBtn} alt="" />
                </div>
                <div className="price__container">
                  <div className="counter__container">
                    <button className="counter__btn">-</button>0
                    <button className="counter__btn">+</button>
                  </div>
                  <div className="price__box">
                    <p className="price">${item.discont_price}</p>
                    <p className="discount__price">${item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="order__container">
        <h3></h3>
        <div className="total__items">
          <p className="items"></p>
          <p className="total__price"></p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
