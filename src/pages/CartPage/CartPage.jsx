import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import deleteBtn from "../../assets/image/delete.svg";
import "./CartPage.scss";
import CheckoutForm from "../../UI/CheckoutForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementProduct,
  getCartFromLocalStorage,
  incrementProduct,
  removeProduct,
  sendProducts,
} from "../../store/futures/productSlice.js";
import { Link } from "react-router-dom";
import OrderModal from "../../components/OrderModal/OrderModal.jsx";
import CartPageEmpty from "./CartPageEmpty.jsx";

const CartPage = () => {
  const [sendingOrder, setSendingOrder] = useState(false);
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const counterIncrement = (item) => {
    dispatch(incrementProduct(item));
  };
  const counterDecrement = (item) => {
    dispatch(decrementProduct(item));
  };
  const remove = (item) => {
    dispatch(removeProduct(item));
  };
  const allPrice = cart.map((el) => {
    if (el.discount_total_price) {
      return el.discount_total_price;
    }
    return el.total_price;
  });

  useEffect(() => {
    dispatch(getCartFromLocalStorage());
  }, []);

  const totalPrice = allPrice.reduce((acc, el) => acc + el, 0).toFixed(2);
  return (
    <div className="first__container">
      <div className="blok__title_btn">
        <h2 className="title__cart">Shopping cart</h2>
        <div className="line"></div>
        <Link className="link" to={`/`}>
          Back to the store
        </Link>
      </div>
      <OrderModal
        sendingOrder={sendingOrder}
        setSendingOrder={setSendingOrder}
      />
      {cart.length == 0 ? (
        <CartPageEmpty />
      ) : (
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
                      <img
                        onClick={() => remove(item)}
                        className="delete"
                        src={deleteBtn}
                        alt=""
                      />
                    </div>
                    <div className="price__container">
                      <div className="counter__container">
                        <button
                          onClick={() => counterDecrement(item)}
                          className="counter__btn"
                        >
                          -
                        </button>
                        {item ? item.count : 0}
                        <button
                          onClick={() => counterIncrement(item)}
                          className="counter__btn"
                        >
                          +
                        </button>
                      </div>
                      <div className="price__box">
                        {item.discont_price &&
                        item.discont_price < item.price ? (
                          <>
                            <span className="price">
                              $
                              {item
                                ? Math.floor(item.discount_total_price * 100) /
                                  100
                                : Math.floor(item.discont_price * 100) / 100}
                            </span>

                            <span className="discont_price">
                              $
                              {item
                                ? Math.floor(item.total_price * 100) / 100
                                : Math.floor(item.price * 100) / 100}
                            </span>
                          </>
                        ) : (
                          <span className="price">
                            $
                            {item
                              ? Math.floor(item.total_price * 100) / 100
                              : Math.floor(item.price * 100) / 100}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="order__container">
            <h3>Order details</h3>
            <p className="items">{cart.length} items</p>
            <div className="total__items">
              <p className="items">Total</p>
              <p className="total__price">${totalPrice}</p>
            </div>
            <CheckoutForm
              classInput="input"
              classBtn="btn"
              textBtn="Order "
              setSendingOrder={setSendingOrder}
              sendProducts={sendProducts}
              cartProducts={cart}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
