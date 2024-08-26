import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productSlice, {
  fetchProductsById,
  incrementProduct,
  decrementProduct,
} from "../../store/futures/productSlice";
import { NavLink, useLocation } from "react-router-dom";
import "./ProductPage.scss";
import heart from "../../assets/image/heart.png";

function ProductPage() {
  const [readMore, setReadMore] = useState(false);
  const styleDiscription = {
    display: readMore ? "block" : "-webkit-box",
  };

  const openText = () => {
    setReadMore(!readMore);
  };

  const location = useLocation();
  const { state } = location;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsById(state.id));
  }, []);

  const { product, loading, cart } = useSelector((state) => state.products);
  if (loading) {
    return <div>Loading...</div>;
  }

  let productInCart = cart.filter((el) => el.id === state.id);
  let [currentProduct] = productInCart;
  const addToCart = (item) => {
    dispatch(incrementProduct(item));
  };
  const counterDecrement = (item) => {
    dispatch(decrementProduct(item));
  };

  return (
    <div className="product__container">
      <div className="container__box">
        <div className="links">
          <NavLink to={"/"} className="link__main">
            Main Page
          </NavLink>
          <div className="feature"></div>
          <NavLink to={"/categories"} className="link__main">
            Category
          </NavLink>
          <div className="feature"></div>
          {/* <NavLink to={"/"} className="link__main">
          </NavLink> */}
          <div className="feature"></div>
          <p className="link">{state.title}</p>
        </div>
        {product &&
          product.map((item) => (
            <div key={item.id} className="item__box">
              <div className="title__heart-480">
                <h3 className="title">{item.title}</h3>
                <img className="heart" src={heart} alt="" />
              </div>
              <div className="product__box">
                <img
                  className="product__img"
                  src={`https://exam-server-5c4e.onrender.com/${item.image}`}
                  alt=""
                />
                <div className="info__container">
                  <div className="title__heart">
                    <h3 className="title">{item.title}</h3>
                    <img className="heart" src={heart} alt="" />
                  </div>
                  <div className="price__container">
                    <p className="price">
                      $
                      {currentProduct
                        ? Math.floor(currentProduct.total_price * 100) / 100
                        : Math.floor(item.price * 100) / 100}
                    </p>
                    {item.discont_price ? (
                      <>
                        <p className="discount__price">
                          $
                          {currentProduct
                            ? currentProduct.total_price
                            : item.price}
                        </p>
                        <div className="sale">{`- ${Math.ceil(
                          100 - item.discont_price / (item.price / 100)
                        )} %`}</div>
                      </>
                    ) : null}
                    {/* {item.discont_price ? (
                    ) : null} */}
                  </div>
                  <p>{item.price_discont}</p>
                  <div className="counter__container">
                    <div className="counter__box">
                      <button
                        onClick={() => counterDecrement(item)}
                        className="counter__btn"
                      >
                        -
                      </button>
                      {currentProduct ? currentProduct.count : 1}
                      <button
                        onClick={() => addToCart(item)}
                        className="counter__btn"
                      >
                        +
                      </button>
                    </div>
                    <button onClick={() => addToCart(item)} className="add__to">
                      Add to cart
                    </button>
                  </div>
                  <div className="description__container">
                    <h5>Discription</h5>
                    <p style={styleDiscription} className="description">
                      {item.description}
                    </p>
                    <p className="read__more" onClick={openText}>
                      Read more
                    </p>
                  </div>
                </div>
              </div>
              <div className="description__container-768">
                <h5>Discription</h5>
                <p style={styleDiscription} className="description">
                  {item.description}
                </p>
                <p className="read__more" onClick={openText}>
                  Read more
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductPage;
