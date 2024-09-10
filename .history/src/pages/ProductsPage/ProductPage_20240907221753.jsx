import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productSlice, {
  fetchProductsById,
  incrementProduct,
  decrementProduct,
} from "../../store/futures/productSlice";
import { NavLink, useLocation, useParams } from "react-router-dom";
import "./ProductPage.scss";
import heart from "../../assets/image/heart.png";

function ProductPage() {
  const { id } = useParams();

  const { product, loading, cart } = useSelector((state) => state.products);

  const [readMore, setReadMore] = useState(false);
  const [productInCart, setProductInCart] = useState(false)

  const styleDiscription = {
    display: readMore ? "block" : "-webkit-box",
  };

  const openText = () => {
    setReadMore(!readMore);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsById(id))
  }, [id]);

  useEffect(() => {
    let productInCart = cart.filter((el) => el.id === product.id);

    if (productInCart) {
      setProductInCart(true)
    } else {
      setProductInCart(false)
    }
  }, [product])


  if (loading) {
    return <div>Loading...</div>;
  }


  // let [currentProduct] = productInCart;

  const addToCart = (item) => {
    dispatch(incrementProduct(item));
  };

  const counterDecrement = (item) => {
    dispatch(decrementProduct(item));
  };


  const price = product ? Math.floor(product?.total_price * 100) / 100 : Math.floor(product?.price * 100) / 100;

  const getSalePercent = (discountPrice, currentPrice) => {
    return Math.ceil(100 - discountPrice / (currentPrice / 100))
  }

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
          {/* <NavLink to={"/"} className="link__main">
          </NavLink> */}
          <div className="feature"></div>
          <p className="link">{product?.title}</p>
        </div>
        {
          product &&
          <div key={product?.id} className="item__box">
            <div className="title__heart-480">
              <h3 className="title">{product?.title}</h3>
              <img className="heart" src={heart} alt="" />
            </div>
            <div className="product__box">
              <img
                className="product__img"
                src={`https://exam-server-5c4e.onrender.com/${product?.image}`}
                alt=""
              />
              <div className="info__container">
                <div className="title__heart">
                  <h3 className="title">{product?.title}</h3>
                  <img className="heart" src={heart} alt="" />
                </div>
                <div className="price__container">

                  {
                    product?.discont_price
                      ? (
                        <>
                          <p className="price"> $ {product.discont_price} </p>
                          <p className="discount__price">
                            $ {product?.price}
                          </p>

                          <div className="sale">{`- ${salePercent} %`}</div>
                        </>
                      )
                      : <p className="price"> $ {product.price} </p>}
                </div>
                <p>{product.price_discont}</p>
                <div className="counter__container">
                  <div className="counter__box">
                    <button
                      onClick={() => counterDecrement(product)}
                      className="counter__btn"
                    >
                      -
                    </button>
                    {product ? product.count : 1}
                    <button
                      onClick={() => addToCart(product)}
                      className="counter__btn"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => addToCart(product)} className="add__to">
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
        }
      </div>
    </div>
  );
}

export default ProductPage;