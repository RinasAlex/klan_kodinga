import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsById,
  addProduct,
} from "../../store/futures/productSlice";
import { NavLink, useParams } from "react-router-dom";
import "./ProductPage.scss";
import heart from "../../assets/image/heart.png";

function ProductPage() {
  const { id } = useParams();
  const [category, setCategory] = useState("");

  const { product, loading } = useSelector((state) => state.products);

  const categoriesState = useSelector(
    (state) => state.categories.categoriesData
  );

  useEffect(() => {
    let cauntCategory = categoriesState.find(
      (el) => el.id == product?.categoryId
    );
    setCategory(cauntCategory);
  }, [product]);

  const [readMore, setReadMore] = useState(false);
  let [count, setCount] = useState(1);
  let [modal, setModal] = useState(false);

  const styleDiscription = {
    display: readMore ? "block" : "-webkit-box",
  };

  const openText = () => {
    setReadMore(!readMore);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsById(id));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const addToCart = (item) => {
    dispatch(addProduct({ product: item, count }));
  };

  const counterIncrement = () => {
    setCount(++count);
  };
  const counterDecrement = () => {
    if (count > 0) {
      setCount(--count);
    }
  };
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const getSalePercent = (discountPrice, currentPrice) => {
    return Math.ceil(100 - discountPrice / (currentPrice / 100));
  };

  const salePercent = getSalePercent(product?.discont_price, product?.price);
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
          <NavLink to={"/"} className="link__main">
            {category?.title}
          </NavLink>
          <div className="feature"></div>
          <p className="link">{product?.title}</p>
        </div>
        {product && (
          <div key={product?.id} className="item__box">
            <div className="title__heart-480">
              <h3 className="title">{product?.title}</h3>
              <img className="heart" src={heart} alt="" />
            </div>
            <div className="product__box">
              <img
                onClick={openModal}
                className="product__img"
                src={`https://exam-server-5c4e.onrender.com/${product?.image}`}
                alt=""
              />
              <div
                onClick={closeModal}
                className={modal ? "modal__container__img" : "close__window"}
              >
                <img
                  className="modal__window__img"
                  src={`https://exam-server-5c4e.onrender.com/${product?.image}`}
                  alt=""
                />
              </div>
              <div className="info__container">
                <div className="title__heart">
                  <h3 className="title">{product?.title}</h3>
                  <img className="heart" src={heart} alt="" />
                </div>
                <div className="price__container">
                  {product?.discont_price ? (
                    <>
                      <p className="price">
                        {" "}
                        ${(product.discont_price * count).toFixed(2)}
                      </p>
                      <p className="discount__price">
                        ${(product?.price * count).toFixed(2)}
                      </p>
                      <div className="sale">-${salePercent}%</div>
                    </>
                  ) : (
                    <p className="price">
                      {" "}
                      ${(product.price * count).toFixed(2)}{" "}
                    </p>
                  )}
                </div>
                <p>{product.price_discont}</p>
                <div className="counter__container">
                  <div className="counter__box">
                    <button onClick={counterDecrement} className="counter__btn">
                      -
                    </button>
                    {count}
                    <button onClick={counterIncrement} className="counter__btn">
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="add__to"
                  >
                    Add to cart
                  </button>
                </div>
                <div className="description__container">
                  <h5>Discription</h5>
                  <p style={styleDiscription} className="description">
                    {product.description}
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
                {product.description}
              </p>
              <p className="read__more" onClick={openText}>
                Read more
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
