import React, { useEffect, useState } from "react";
import "./ModalWindow.scss";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import { addProduct } from "../../store/futures/productSlice";

const ModalWindow = ({ onClose }) => {
  const { products } = useSelector((state) => state.products);

  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();

  const onCloseButtonClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const getRandomProducts = (products, count) => {
    return products && products.length > 0
      ? [...products].sort(() => 0.5 - Math.random()).slice(0, count)
      : [];
  };

  useEffect(() => {
    let currentItem = getRandomProducts(products, 1)[0];

    let data = {
      ...currentItem,
      price: currentItem.price,
      discont_price: (currentItem.price / 2).toFixed(2),
    };
    
    setProduct(data);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__content">
          <div className="modal__content_title">
            <h3>50% discount on product of the day!</h3>
            <button className="modal-close" onClick={onCloseButtonClick}>
              x
            </button>
          </div>

          <div className="modal__content_item">
            {product && <ProductCard product={product} isCartHidden={true} />}
          </div>

          <button
            onClick={() => dispatch(addProduct(product))}
            className="modal__content_cart"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
